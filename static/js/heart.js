(function() {
  var setTransformOrigin = function(el) {
    var $el = document.getElementById(el),
        BBox = $el.getBBox();

    $el.style.transformOrigin = (BBox.x + BBox.height / 2) + 'px ' + (BBox.y + BBox.width / 2) + 'px';
  };

  // Animate gears
  var animateGear = function(el, rotation, duration) {
    anime({
      targets: el,
      rotate: rotation,
      easing: 'linear',
      duration: duration,
      loop: true
    });
  };

  setTransformOrigin('gear-1');
  setTransformOrigin('gear-2');
  setTransformOrigin('gear-3');
  setTransformOrigin('gear-4');

  animateGear(['#gear-1', '#gear-3'], 360, 2000);
  animateGear('#gear-4', 360, 3000);
  animateGear('#gear-2', -360, 1000);

  // Animate particles
  for (var i = 1; i < 13; i++) {
    setTransformOrigin('particle-' + i);

    anime({
      targets: '#particle-' + i,
      translateY: [anime.random(2, 5), anime.random(-5, -2)],
      scale: [1, 1.2],
      easing: 'linear',
      duration: anime.random(1500, 2000),
      direction: 'alternate',
      loop: true
    });
  }

  // Animate pipe particles
  var pipePath1 = anime.path('#pipe-1');
  var pipePath2 = anime.path('#pipe-2');

  var animatePipeParticle = function(el, path, duration) {
    anime({
      targets: el,
      translateX: path,
      translateY: path,
      easing: 'linear',
      duration: duration,
      loop: true
    });
  };

  animatePipeParticle('#pipe-particle-1', pipePath1, 3000);
  animatePipeParticle('#pipe-particle-2', pipePath1, 4000);
  animatePipeParticle('#pipe-particle-3', pipePath1, 5000);

  animatePipeParticle('#pipe-particle-4', pipePath2, 3000);
  animatePipeParticle('#pipe-particle-5', pipePath2, 4000);
  animatePipeParticle('#pipe-particle-6', pipePath2, 5000);
})();