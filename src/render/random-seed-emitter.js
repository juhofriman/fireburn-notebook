
function emit() {
    window.eventbus.publish('RANDOM_SEED', Math.random());
    setTimeout(emit, 1000);
}
emit();