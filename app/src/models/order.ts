//Auto-generated model describing and order, thanks http://www.json2ts.com/
declare module OrderModel {

    export interface Length {
        unit: string;
        value: number;
    }

    export interface Width {
        unit: string;
        value: number;
    }

    export interface Height {
        unit: string;
        value: number;
    }

    export interface Weight {
        unit: string;
        value: number;
    }

    export interface Product {
        quantity: number;
        label: string;
        ean: string;
    }

    export interface Package {
        length: Length;
        width: Width;
        height: Height;
        weight: Weight;
        products: Product[];
    }

    export interface BillingAddress {
        postalCode: string;
        city: string;
        addressLine1: string;
        addressLine2: string;
    }

    export interface DeliveryAddress {
        postalCode: string;
        city: string;
        addressLine1: string;
        addressLine2: string;
    }

    export interface Contact {
        firstname: string;
        lastname: string;
        phone: string;
        mail: string;
        billingAddress: BillingAddress;
        deliveryAddress: DeliveryAddress;
    }

    export interface HeadOfficeAddress {
        postalCode: string;
        city: string;
        addressLine1: string;
        addressLine2: string;
    }

    export interface Contact2 {
        firstname: string;
        lastname: string;
        phone: string;
        mail: string;
        headOfficeAddress: HeadOfficeAddress;
    }

    export interface Carrier {
        name: string;
        contact: Contact2;
    }

    export interface Order {
        id: number;
        createdAt: Date;
        packages: Package[];
        contact: Contact;
        carrier: Carrier;
    }
}
export default OrderModel

export class AnonymousContact implements OrderModel.Contact {
  firstname: string = "anonymous";
  lastname: string = "anonymous";
  phone: string = "anonymous";
  mail: string = "anonymous";
  billingAddress: OrderModel.BillingAddress = {
    postalCode: "anonymous",
    city: "anonymous",
    addressLine1: "anonymous",
    addressLine2: "anonymous",
  };
  deliveryAddress: OrderModel.DeliveryAddress = {
    postalCode: "anonymous",
    city: "anonymous",
    addressLine1: "anonymous",
    addressLine2: "anonymous",
  };
}
