export const Endpoints = {
    car: {
        getCar: { method: 'get', path: () => `/getCars` },
        createCar: { method: 'post', path: () => `/createCar` }
    }
}