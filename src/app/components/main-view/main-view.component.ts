import { Component, OnInit } from "@angular/core";
import { Car } from "../models/car-model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CarService } from "src/app/services/car-services";
import { map, take } from "rxjs";

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

    Car: Car = {
        name: "",
        model: "",
        year: 0,
        valueUI: ""
    }
    CarForm: FormGroup;
    cars: Car[] = []

    constructor(private formBuilder: FormBuilder, private carService: CarService) {
        this.CarForm = this.formBuilder.group({
            Name: ['', Validators.required],
            Model: ['', Validators.required],
            Year: [0, Validators.required]
        });
    }
    ngOnInit(): void {
        this.loadCars();
    }

    addCar() {
        if (this.CarForm.status === 'VALID') {
            this.Car.name = this.CarForm.value.Name;
            this.Car.model = this.CarForm.value.Model;
            this.Car.year = parseInt(this.CarForm.value.Year);
            if (this.carDuplicated(this.Car)) {
                alert(`The car with name: ${this.Car.name}, model: ${this.Car.model}, year: ${this.Car.year} already exists`);
                return;
            }
            this.carService.createCar(this.Car).subscribe({
                next: (res) => {
                    alert('CREATED');
                    this.loadCars();
                },
                error(err) {
                    console.log('Error creating user', err);
                },
            })
        }
    }

    loadCars() {
        this.carService.getCars()
            .pipe(take(1))
            .subscribe(data => {
                this.cars = data;
                this.cars.forEach(val => {
                    val.valueUI = `${val.name}, ${val.model}, ${val.year}`;
                });
            })
    }

    onDropdownChange(event: any) {
        let carValue = event.value.split(',');
        this.CarForm.setValue({ Name: carValue[0].trim(), Model: carValue[1].trim(), Year: parseInt(carValue[2].trim()) })
    }

    carDuplicated(_car: Car): boolean {
        let carFlag = false;
        this.cars.forEach(car => {
            let validation = car.name === _car.name && car.model === _car.model && car.year == _car.year;
            if (validation) carFlag = validation; 
        });
        if (carFlag) return true;
        return false;
    }
}