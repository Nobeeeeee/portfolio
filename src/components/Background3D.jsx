import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2500
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Soft glowing star texture
    function createStarTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    }

    const starTexture = createStarTexture();

    // 360-degree cylindrical / radial galaxy distribution
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const posArray = new Float32Array(starCount * 3);
    const colorsArray = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Uniform circular distribution around the center
      const radius = Math.sqrt(Math.random()) * 1600 + 50;
      const theta = Math.random() * Math.PI * 2;

      posArray[i * 3] = Math.cos(theta) * radius;
      posArray[i * 3 + 1] = Math.sin(theta) * radius;
      // Spread stars from deep space up to just behind the camera
      posArray[i * 3 + 2] = Math.random() * 2400 - 2000;

      // Color variation: mostly crisp white with vibrant cyan & purple galaxy stars
      const rand = Math.random();
      if (rand < 0.2) {
        // Neon cyan
        colorsArray[i * 3] = 0.0;
        colorsArray[i * 3 + 1] = 0.94;
        colorsArray[i * 3 + 2] = 1.0;
      } else if (rand < 0.35) {
        // Soft violet purple
        colorsArray[i * 3] = 0.75;
        colorsArray[i * 3 + 1] = 0.45;
        colorsArray[i * 3 + 2] = 1.0;
      } else {
        // Brilliant white
        colorsArray[i * 3] = 1.0;
        colorsArray[i * 3 + 1] = 1.0;
        colorsArray[i * 3 + 2] = 1.0;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 3.2,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const starMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starMesh);

    // Warp Speed State
    let currentSpeed = 1.8;
    let targetSpeed = 1.8;
    let isWarping = false;
    let warpTimeout = null;

    const triggerWarp = () => {
      isWarping = true;
      targetSpeed = 40;
      if (warpTimeout) clearTimeout(warpTimeout);
      warpTimeout = setTimeout(() => {
        isWarping = false;
        targetSpeed = 1.8;
      }, 900);
    };

    const handleGlobalClick = (e) => {
      const target = e.target;
      if (
        target.closest('.btn') ||
        target.closest('.nav-links a') ||
        target.closest('.project-link') ||
        target.closest('.minimal-social') ||
        target.closest('.mega-email')
      ) {
        triggerWarp();
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Floating Elements (Names & Cat Faces)
    function createTextTexture(text) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 256;

      context.font = 'Bold 80px "Space Grotesk", sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.shadowColor = '#00f0ff';
      context.shadowBlur = 20;
      context.fillStyle = '#ffffff';
      context.fillText(text, 256, 128);

      return new THREE.CanvasTexture(canvas);
    }

    const floatingElements = [];
    const textureLoader = new THREE.TextureLoader();

    // Load celestial cat constellation expressions
    const catTextures = [
      textureLoader.load('/cat-hi.png'),   // Saying Hi (Waving paw)
      textureLoader.load('/cat-wink.png'), // Winking / Cheerful
      textureLoader.load('/cat-play.png'), // Cosmic star play
      textureLoader.load('/cat.png'),      // Classic serene
    ];

    // 4 dedicated peripheral sectors (keeping the center reading area clear)
    const sectors = [
      { minX: 380, maxX: 680, minY: 160, maxY: 380 },   // Top-Right
      { minX: -680, maxX: -380, minY: -360, maxY: -160 }, // Bottom-Left
      { minX: 380, maxX: 680, minY: -360, maxY: -160 },  // Bottom-Right
      { minX: -680, maxX: -380, minY: 160, maxY: 380 },   // Top-Left
    ];

    function getSectorPosition(sectorIndex) {
      const sec = sectors[sectorIndex % sectors.length];
      const x = sec.minX + Math.random() * (sec.maxX - sec.minX);
      const y = sec.minY + Math.random() * (sec.maxY - sec.minY);
      const z = -200 - Math.random() * 250;
      return { x, y, z };
    }

    // 4 Celestial Elements (staggered in time & spaced apart in sectors):
    // 0: Cat "Saying Hi" (Top-Right)
    // 1: "Christ" (Bottom-Left)
    // 2: Cat "Winking" (Bottom-Right)
    // 3: "Noble" (Top-Left)
    const itemsConfig = [
      { isText: false, text: '', scale: 135, sector: 0, phase: 0, catIndex: 0 },
      { isText: true, text: 'Christ', scale: 200, sector: 1, phase: 4, catIndex: -1 },
      { isText: false, text: '', scale: 135, sector: 2, phase: 8, catIndex: 1 },
      { isText: true, text: 'Noble', scale: 200, sector: 3, phase: 12, catIndex: -1 },
    ];

    const totalPeriod = 16;
    const glowDuration = 3.6;

    itemsConfig.forEach((cfg) => {
      let material;
      if (cfg.isText) {
        const texture = createTextTexture(cfg.text);
        material = new THREE.SpriteMaterial({
          map: texture,
          color: 0x00f0ff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
      } else {
        material = new THREE.SpriteMaterial({
          map: catTextures[cfg.catIndex],
          color: 0x00f0ff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
      }

      const sprite = new THREE.Sprite(material);
      if (cfg.isText) {
        sprite.scale.set(cfg.scale, cfg.scale / 2, 1);
      } else {
        sprite.scale.set(cfg.scale, cfg.scale, 1);
      }

      const initialPos = getSectorPosition(cfg.sector);
      sprite.position.set(initialPos.x, initialPos.y, initialPos.z);
      scene.add(sprite);

      floatingElements.push({
        sprite,
        material,
        baseX: initialPos.x,
        baseY: initialPos.y,
        baseZ: initialPos.z,
        baseScale: cfg.scale,
        isText: cfg.isText,
        sector: cfg.sector,
        phase: cfg.phase,
        catIndex: cfg.catIndex,
        hasRespawned: false,
      });
    });

    // Animation Loop & Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;

    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth acceleration / deceleration
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      // Camera FOV reaction during warp
      if (isWarping) {
        camera.fov += (115 - camera.fov) * 0.1;
      } else {
        camera.fov += (75 - camera.fov) * 0.08;
      }
      camera.updateProjectionMatrix();

      // Continuous Galaxy Travel (move stars towards camera)
      const positions = starGeometry.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        // Move star forward
        positions[i * 3 + 2] += currentSpeed;

        // When a star passes behind camera, reset it far back into deep space
        if (positions[i * 3 + 2] > 450) {
          positions[i * 3 + 2] = -2000;
          const r = Math.sqrt(Math.random()) * 1600 + 50;
          const th = Math.random() * Math.PI * 2;
          positions[i * 3] = Math.cos(th) * r;
          positions[i * 3 + 1] = Math.sin(th) * r;
        }
      }
      starGeometry.attributes.position.needsUpdate = true;

      // Slow cosmic roll (no pitching to one side)
      starMesh.rotation.z += 0.0006;

      // Subtle responsive camera steering with mouse & scroll
      targetX = mouseX * 0.08;
      targetY = mouseY * 0.08;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - (scrollY * 0.08) - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Floating Elements: only one gracefully appears at a time in its own peripheral sector
      floatingElements.forEach((item) => {
        const timeInCycle = (elapsedTime + item.phase) % totalPeriod;

        if (timeInCycle < glowDuration) {
          item.hasRespawned = false;
          // Smooth sine fade curve
          const progress = timeInCycle / glowDuration;
          const fadeAlpha = Math.sin(progress * Math.PI);
          item.material.opacity = fadeAlpha * 0.75;

          // Gentle cosmic drift
          item.sprite.position.x = item.baseX + Math.cos(elapsedTime * 0.8 + item.phase) * 15;
          item.sprite.position.y = item.baseY + Math.sin(elapsedTime * 1.2 + item.phase) * 15;

          const pulse = 1 + Math.sin(progress * Math.PI) * 0.08;
          if (item.isText) {
            item.sprite.scale.set(item.baseScale * pulse, (item.baseScale / 2) * pulse, 1);
          } else {
            item.sprite.scale.set(item.baseScale * pulse, item.baseScale * pulse, 1);
          }
        } else {
          item.material.opacity = 0;
          // When hidden, pick a new position within its own sector once per cycle
          if (!item.hasRespawned) {
            item.hasRespawned = true;
            const newPos = getSectorPosition(item.sector);
            item.baseX = newPos.x;
            item.baseY = newPos.y;
            item.baseZ = newPos.z;
            item.sprite.position.set(newPos.x, newPos.y, newPos.z);

            // Alternate through celestial cat constellation expressions
            if (!item.isText && item.catIndex >= 0) {
              item.catIndex = (item.catIndex + 2) % catTextures.length;
              item.material.map = catTextures[item.catIndex];
              item.material.needsUpdate = true;
            }
          }
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (warpTimeout) clearTimeout(warpTimeout);
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      starTexture.dispose();
      catTextures.forEach((tex) => tex.dispose());
      renderer.dispose();
    };
  }, []);

  return <div id="vanta-canvas" ref={containerRef} />;
}
