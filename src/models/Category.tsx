
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export class Category {
    id: number;
    name: string;
    color: Color;

    constructor(id: number, name: string, color: Color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}