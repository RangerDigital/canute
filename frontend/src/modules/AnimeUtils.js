// Entrance animation, staggered, selector: #anime-item
// Used on grid pages with list of items
export function startGridAnimation() {
  this.$nextTick(function() {
    this.$anime({
      targets: '#anime-item',
      opacity: ['0%', '100%'],

      translateY: ['-25%', '0%'],
      delay: this.$anime.stagger(250, { start: 0, easing: 'easeOutQuad' }),
      easing: 'easeOutQuad',
    });
  });
}
