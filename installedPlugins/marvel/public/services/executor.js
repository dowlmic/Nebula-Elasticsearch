const _ = require('lodash');
const mod = require('ui/modules').get('marvel/executor', []);

mod.service('$executor', (Promise, $timeout, timefilter) => {
  const queue = [];
  let executionTimer;
  let ignorePaused = false;

  /**
   * Resets the timer to start again
   * @returns {void}
   */
  function reset() {
    cancel();
    start();
  }

  function killTimer() {
    if (executionTimer) $timeout.cancel(executionTimer);
  }

  /**
   * Cancels the execution timer
   * @returns {void}
   */
  function cancel() {
    killTimer();
    timefilter.off('update', killIfPaused);
    timefilter.off('fetch', reFetch);
  }

  /**
   * Registers a service with the executor
   * @param {object} service The service to register
   * @returns {void}
   */
  function register(service) {
    queue.push(service);
  }

  /**
   * Stops the executor and empties the service queue
   * @returns {void}
   */
  function destroy() {
    cancel();
    ignorePaused = false;
    queue.splice(0, queue.length);
  }

  /**
   * Runs the queue (all at once)
   * @returns {Promise} a promise of all the services
   */
  function run() {
    return Promise.all(queue.map((service) => {
      return service.execute()
        .then(service.handleResponse || _.noop)
        .catch(service.handleError || _.noop);
    }))
    .finally(reset);
  }

  function reFetch(changes) {
    cancel();
    run();
  }

  function killIfPaused() {
    if (timefilter.refreshInterval.pause) {
      killTimer();
    }
  }

  /**
   * Starts the executor service if the timefilter is not paused
   * @returns {void}
   */
  function start() {
    timefilter.on('fetch', reFetch);
    timefilter.on('update', killIfPaused);
    if (ignorePaused || !timefilter.refreshInterval.pause) {
      executionTimer = $timeout(run, timefilter.refreshInterval.value);
    }
  }

  /**
   * Expose the methods
   */
  return {
    register,
    start(options = {}) {
      options = _.defaults(options, {
        ignorePaused: false,
        now: false
      });
      if (options.now) {
        return run();
      }
      if (options.ignorePaused) {
        ignorePaused = options.ignorePaused;
      }
      start();
    },
    run,
    destroy,
    reset,
    cancel
  };
});
