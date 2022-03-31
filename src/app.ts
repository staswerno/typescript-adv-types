// intersection types
// similar to interfaces, bit less code

type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// combo of above types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "Stasi",
	privileges: ["dungeon-master"],
	startDate: new Date(),
};

// can do any types
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// type guards
// if statement below is a type guard

function add(a: Combinable, b: Combinable) {
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}

// typeof won't find 'privileges' property below
// another type guard needed: if ("property" in x) {}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log("Name: " + emp.name);
	if ("privileges" in emp) {
		console.log("Privileges: " + emp.privileges);
	}
	if ("startDate" in emp) {
		console.log("Start Date: " + emp.startDate);
	}
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: "Jopi", startDate: new Date() });

// instanceof typeguard (js)
// works only with classes, not instances

class Car {
	drive() {
		console.log("Driving...");
	}
}

class Truck {
	drive() {
		console.log("Driving a truck...");
	}
	loadCargo(amount: number) {
		console.log("Loading cargo... " + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}

useVehicle(v1);
useVehicle(v2);
