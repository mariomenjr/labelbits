// jest.setup.js
beforeEach(() => {
    jest.spyOn(global.console, 'log').mockImplementation(() => { });
    jest.spyOn(global.console, 'warn').mockImplementation(() => { });
    jest.spyOn(global.console, 'error').mockImplementation(() => { });
});

afterEach(() => {
    jest.restoreAllMocks();
});