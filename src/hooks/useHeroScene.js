import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function useHeroScene(active = true) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xfff8f0, 10, 25); 

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd4a76a, 0.6));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffd5a0, 0.6);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xff8c42, 0.5); 
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    // --- Environment Map ---
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    // --- Procedural Textures ---
    function createCrinkleTexture() {
      const c = document.createElement('canvas');
      c.width = c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 512, 512);
      
      ctx.filter = 'blur(4px)';
      for (let octave = 0; octave < 3; octave++) {
        const count = 300 * (octave + 1);
        const radius = (4 - octave) * 3;
        for (let i = 0; i < count; i++) {
          const x = Math.random() * 512, y = Math.random() * 512;
          const shade = Math.floor(110 + Math.random() * 40);
          ctx.fillStyle = `rgba(${shade},${shade},${shade},0.25)`;
          ctx.beginPath();
          ctx.ellipse(x, y, radius, radius * (0.5 + Math.random()), Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.filter = 'none';
      
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.NoColorSpace;
      return tex;
    }

    function createAlbedoTexture(baseColor) {
      const c = document.createElement('canvas');
      c.width = c.height = 512;
      const ctx = c.getContext('2d');
      const color = new THREE.Color(baseColor);
      
      ctx.fillStyle = `#${color.getHexString()}`;
      ctx.fillRect(0, 0, 512, 512);

      ctx.filter = 'blur(15px)';
      const lighter = color.clone().offsetHSL(0, -0.1, 0.18);
      
      for (let i = 0; i < 25; i++) {
        ctx.fillStyle = `rgba(${Math.floor(lighter.r*255)}, ${Math.floor(lighter.g*255)}, ${Math.floor(lighter.b*255)}, 0.4)`;
        const x = Math.random() * 512, y = Math.random() * 512, r = Math.random() * 60 + 20;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.filter = 'none';
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    function createOilRoughnessTexture() {
      const c = document.createElement('canvas');
      c.width = c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#bbbbbb'; 
      ctx.fillRect(0, 0, 512, 512);

      ctx.filter = 'blur(10px)';
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 512, y = Math.random() * 512, r = Math.random() * 50 + 20;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, 'rgba(0,0,0,0.5)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.filter = 'none';
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.NoColorSpace;
      return tex;
    }

    const bumpTexture = createCrinkleTexture();
    const oilRoughnessTexture = createOilRoughnessTexture();

    // --- PRNG & Shape Builder ---
    function mulberry32(seed) {
      let s = seed >>> 0;
      return function () {
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function makeChipShape({ size, segments, aspect, irregularity, waveAmp, rnd }) {
      const pts = [];
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const noise =
          Math.sin(a * 7) * waveAmp[0] +
          Math.cos(a * 4) * waveAmp[1] +
          Math.sin(a * 11) * waveAmp[2] +
          (rnd() - 0.5) * irregularity;
        const r = size + noise;
        pts.push(new THREE.Vector2(Math.cos(a) * r * aspect, Math.sin(a) * r));
      }
      const shape = new THREE.Shape();
      shape.setFromPoints(pts);
      return shape;
    }

    // --- Curved Geometry ---
    // DITAMBAHKAN: Parameter bevelThickness & bevelSize agar Pisang bisa tebal
    function createCurvedChipGeometry({
      size = 1, aspect = 1.0, depth = 0.08,
      bevelThickness = 0.02, bevelSize = 0.035,
      mode = 'saddle', curvature = 0.35, bowl = 0.12,
      waveAmp = [0.05, 0.03, 0.02], irregularity = 0.04,
      segments = 120, seed = 101, crinkleAmp = 0.012,
    }) {
      const rnd = mulberry32(seed);
      const shape = makeChipShape({ size, segments, aspect, irregularity, waveAmp, rnd });
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth, bevelEnabled: true, bevelThickness, bevelSize,
        bevelSegments: 6, curveSegments: segments,
      });
      const pos = geo.attributes.position;
      const r = size;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        const nx = x / r, ny = y / r;
        let bend = 0;
        if (mode === 'saddle') {
          bend = curvature * (nx * nx - ny * ny);
        } else if (mode === 'bowl') {
          bend = curvature * (1 - Math.min((nx * nx + ny * ny) / 1.2, 1));
        } else if (mode === 'taco') {
          bend = curvature * nx * nx;
        }
        const bowlLift = bowl * (1 - Math.min((nx * nx + ny * ny) / 1.3, 1));
        const crinkle =
          Math.sin(x * 7 + seed) * Math.cos(y * 7) * crinkleAmp +
          Math.sin(x * 13 - y * 11) * (crinkleAmp * 0.5);
        pos.setZ(i, z + bend + bowlLift + crinkle);
      }
      geo.computeVertexNormals();
      geo.center();
      return geo;
    }

    // --- Variant Geometries ---
    const variantGeometries = {
      ubiUngu: createCurvedChipGeometry({
        size: 1.0, aspect: 1.05, mode: 'saddle', curvature: 0.42, bowl: 0.06,
        waveAmp: [0.06, 0.035, 0.02], irregularity: 0.05, seed: 101, segments: 120,
      }),
      singkongOriginal: createCurvedChipGeometry({
        size: 1.05, aspect: 1.25, mode: 'bowl', curvature: 0.18, bowl: 0.28,
        waveAmp: [0.08, 0.045, 0.03], irregularity: 0.07, seed: 202, segments: 120,
      }),
      ubiOrange: createCurvedChipGeometry({
        size: 1.0, aspect: 0.95, mode: 'taco', curvature: 0.38, bowl: 0.08,
        waveAmp: [0.05, 0.03, 0.02], irregularity: 0.04, seed: 303, segments: 120,
      }),
      singkongPedas: createCurvedChipGeometry({
        size: 1.1, aspect: 1.15, mode: 'saddle', curvature: 0.5, bowl: 0.05,
        waveAmp: [0.09, 0.05, 0.03], irregularity: 0.08, seed: 404, segments: 120,
      }),
      // PEMBARUAN: Pisang Vacuum Frying (Tebal & Menggembung)
      pisang: createCurvedChipGeometry({
        size: 0.95, aspect: 0.9, mode: 'bowl', curvature: 0.15, bowl: 0.45, // Bowl tinggi = sangat cembung
        depth: 0.28, bevelThickness: 0.12, bevelSize: 0.1, // Tebal ekstrusi & bevel besar
        waveAmp: [0.035, 0.02, 0.012], irregularity: 0.02, seed: 505, segments: 120,
      }),
    };

    // --- Chip Configs ---
    const chipConfigs = [
      { variant: 'ubiUngu', color: 0x8b5cf6, size: 1.05 },
      { variant: 'singkongOriginal', color: 0xf4c842, size: 1.0 },
      { variant: 'ubiOrange', color: 0xf4721e, size: 0.95 },
      { variant: 'singkongPedas', color: 0xd62828, size: 1.1 },
      { variant: 'pisang', color: 0xfbbf24, size: 0.9 },
      { variant: 'ubiUngu', color: 0x7e22ce, size: 0.85 },
      { variant: 'singkongOriginal', color: 0xe8b923, size: 1.0 },
    ];

    function makeMaterial(config) {
      const base = new THREE.Color(config.color);
      base.offsetHSL(0, 0, (Math.random() - 0.5) * 0.05);
      const albedoTex = createAlbedoTexture(base.getHex());
      const mat = new THREE.MeshPhysicalMaterial({
        map: albedoTex,
        bumpMap: bumpTexture,
        bumpScale: 0.015, 
        roughnessMap: oilRoughnessTexture,
        roughness: 1.0,
        metalness: 0.0,
        clearcoat: 0.8,          
        clearcoatRoughness: 0.25,
        side: THREE.DoubleSide,
        envMapIntensity: 1.0,    
      });
      mat.userData.albedoTex = albedoTex;
      return mat;
    }

    const chips = [];
    const chipGroup = new THREE.Group();

    chipConfigs.forEach((config, index) => {
      const geo = variantGeometries[config.variant];
      const material = makeMaterial(config);
      const chip = new THREE.Mesh(geo, material);
      const scale = config.size;
      chip.scale.setScalar(scale);

      const angle = (index / chipConfigs.length) * Math.PI * 2 + index * 0.25;
      const ring = index % 2;
      const radius = 2.2 + ring * 1.1; // Sedikit melebar agar tidak berhimpit dari awal
      const zLayer = ((index / (chipConfigs.length - 1)) - 0.5) * 3.2;
      chip.position.set(2.5 + Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, zLayer);
      chip.rotation.set(
        (Math.random() - 0.5) * 0.5 + 0.3,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.4,
      );

      chip.userData = {
        basePos: chip.position.clone(),
        baseScale: scale,
        curScale: scale,
        floatSpeed: 0.4 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        rotSpeed: { x: (Math.random() - 0.5) * 0.3, y: (Math.random() - 0.5) * 0.4, z: (Math.random() - 0.5) * 0.3 },
        push: new THREE.Vector3(),
        pushTarget: new THREE.Vector3(),
        hoverWeight: 0,
        // Tambahan untuk collision
        collisionRadius: 0.9 * scale, 
      };
      chips.push(chip);
      chipGroup.add(chip);
    });
    scene.add(chipGroup);

    // --- Particles (crumbs) ---
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color(0xd62828), new THREE.Color(0xf4c842), new THREE.Color(0xf4721e), new THREE.Color(0x8b5cf6), new THREE.Color(0xfbbf24)];
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.3) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      const c = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = c.r; particleColors[i * 3 + 1] = c.g; particleColors[i * 3 + 2] = c.b;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particleMaterial = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
    scene.add(new THREE.Points(particleGeometry, particleMaterial));

    // --- Pointer interaction ---
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const pointerWorld = new THREE.Vector3(2.5, 0, 0);
    let pointerActive = false;

    const updatePointer = (clientX, clientY) => {
      ndc.x = (clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(interactionPlane, pointerWorld)) pointerActive = true;
    };
    const onMouseMove = (e) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e) => { if (e.touches.length > 0) updatePointer(e.touches[0].clientX, e.touches[0].clientY); };

    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
    const onParallax = (clientX, clientY) => {
      targetMouseX = (clientX / window.innerWidth - 0.5) * 0.6;
      targetMouseY = (clientY / window.innerHeight - 0.5) * 0.4;
    };
    const onMouseParallax = (e) => onParallax(e.clientX, e.clientY);
    const onTouchParallax = (e) => { if (e.touches.length > 0) onParallax(e.touches[0].clientX, e.touches[0].clientY); };

    if (!prefersReduced) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mousemove', onMouseParallax);
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchmove', onTouchParallax, { passive: true });
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Animation loop ---
    const clock = new THREE.Clock();
    let frameId;
    const HOVER_RADIUS = 1.8;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      chips.forEach((chip) => {
        const data = chip.userData;
        const px = data.basePos.x + Math.cos(elapsed * data.floatSpeed * 0.7 + data.floatOffset) * 0.15;
        const py = data.basePos.y + Math.sin(elapsed * data.floatSpeed + data.floatOffset) * 0.25;
        const pz = data.basePos.z + Math.sin(elapsed * data.floatSpeed * 0.5 + data.floatOffset) * 0.1;

        if (pointerActive) {
          const dx = px - pointerWorld.x, dy = py - pointerWorld.y;
          const dist = Math.hypot(dx, dy);
          if (dist < HOVER_RADIUS && dist > 1e-3) {
            const f = 1 - dist / HOVER_RADIUS;
            const s = f * f * 0.6;
            data.pushTarget.set((dx / dist) * s, (dy / dist) * s, 0);
            data.hoverWeight = f;
          } else {
            data.pushTarget.set(0, 0, 0);
            data.hoverWeight = 0;
          }
        } else {
          data.pushTarget.set(0, 0, 0);
          data.hoverWeight = 0;
        }
        data.push.lerp(data.pushTarget, 0.12);
        chip.position.set(px + data.push.x, py + data.push.y, pz);

        const targetScale = data.baseScale * (1 + data.hoverWeight * 0.18);
        data.curScale += (targetScale - data.curScale) * 0.12;
        chip.scale.setScalar(data.curScale);

        chip.rotation.x += data.rotSpeed.x * 0.006;
        chip.rotation.y += data.rotSpeed.y * 0.006;
        chip.rotation.z += data.rotSpeed.z * 0.006;
      });

      // ==============================================================
      // FITUR ANTI-TABRAKAN (COLLISION RESOLUTION)
      // Cek jarak antar kripik, jika terlalu dekat, dorong agar saling menjauh
      // ==============================================================
      for (let i = 0; i < chips.length; i++) {
        for (let j = i + 1; j < chips.length; j++) {
          const c1 = chips[i];
          const c2 = chips[j];
          const dx = c1.position.x - c2.position.x;
          const dy = c1.position.y - c2.position.y;
          const dz = c1.position.z - c2.position.z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          // Jarak minimal dihitung dari skala kripik
          const minDist = (c1.userData.collisionRadius + c2.userData.collisionRadius) * 1.1;
          
          if (dist < minDist && dist > 1e-3) {
            const overlap = (minDist - dist) * 0.5; // Bagi 2 agar saling mendorong
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;
            
            // Dorong kripik 1 menjauh
            c1.position.x += nx * overlap;
            c1.position.y += ny * overlap;
            c1.position.z += nz * overlap;
            
            // Dorong kripik 2 menjauh
            c2.position.x -= nx * overlap;
            c2.position.y -= ny * overlap;
            c2.position.z -= nz * overlap;
          }
        }
      }

      camera.position.x = mouseX * 0.8;
      camera.position.y = -mouseY * 0.5;
      camera.lookAt(1.5, 0, 0);
      renderer.render(scene, camera);
    };

    if (prefersReduced) renderer.render(scene, camera);
    else animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', onMouseParallax);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchmove', onTouchParallax);
      window.removeEventListener('resize', onResize);
      Object.values(variantGeometries).forEach((g) => g.dispose());
      bumpTexture.dispose();
      oilRoughnessTexture.dispose();
      envTex.dispose();
      pmrem.dispose();
      chipGroup.traverse((obj) => {
        if (obj.isMesh) {
          obj.material.userData.albedoTex?.dispose();
          obj.material.dispose();
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [active]);

  return canvasRef;
}
