import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display weak if 5 is passed', () => {
    const strength = pipe.transform(5);
    expect(strength).toEqual('5 (weak)');
  });

  it('should display strong if 15 is passed', () => {
    const strength = pipe.transform(15);
    expect(strength).toEqual('15 (strong)');
  });

  it('should display strongest if 25 is passed', () => {
    const strength = pipe.transform(25);
    expect(strength).toEqual('25 (strongest)');
  });
});
