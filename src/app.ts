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
