import {renderHook} from '@testing-library/react-hooks';
import {useInterval} from '../../utils/hooks';

describe('useInterval', () => {
  const callback = jest.fn();

  // setup to use fake timers to prevent flakey results from setInterval
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('Should call callback after a delay', () => {
    renderHook(() => useInterval(callback, 10));
    expect(callback).not.toHaveBeenCalled();

    // fast-forward and exhaust pending timers
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalled();
  });
  it('Should not call callback when no delay is passed', () => {
    renderHook(() => useInterval(callback, null));
    expect(callback).not.toHaveBeenCalled();
  });
  it('Should stop execution of setInterval if new delay passed is null', () => {
    let delay: number | null = 10;
    const {rerender} = renderHook(() => useInterval(callback, delay));
    expect(callback).not.toHaveBeenCalled();

    // set a new delay of null during execution of prev delay
    delay = null;
    rerender();

    // fast-forward and exhaust any pending timers
    jest.runOnlyPendingTimers();
    expect(callback).not.toHaveBeenCalled();
  });
  it('Should return ref interval id when passed a delay', () => {
    const {result} = renderHook(() => useInterval(callback, 1));
    expect(typeof result.current.current).toBe('number');
  });
  it('Should return ref with null value when no delay is passed', () => {
    const {result} = renderHook(() => useInterval(callback, null));
    expect(result.current.current).toBeNull();
  });
});

