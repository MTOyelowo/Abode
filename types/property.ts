import { IApartment } from "./apartment";
import { IPet } from "./pet";
import { IScore } from "./score";
import { IReview } from "./review";


export type IProperty = {
    id: number;
    unitType: string;
    images: string[];
    about: string;
    rentLow: number;
    rentHigh: number;
    bedroomLow: number;
    bedroomHigh: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    tags: string[];
    lat: number;
    lng: number;
    pets: IPet[];
    apartments: IApartment[];
    features: string[];
    phoneNumber: string;
    website: string;
    scores: IScore[];
    stars: number;
    reviews?: IReview[]
}