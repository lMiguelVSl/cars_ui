export const Endpoints = {
    car: {
        getCar: { method: 'get', path: () => `api/v1/Car` },
        createCar: { method: 'post', path: () => `api/v1/Car` }
    }
}