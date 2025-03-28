class Suv implements Vehicle {
    open (): void {
        console.log("Suv doors are open");
    }
    start (): void {
        console.log("Fuel engine started");
    }
}