type Campaign = {
  id: string;
  name: string;
  customerId: string;
  start: string;
  end: string;
  pricePerPlane: number;
  planeAmount: number;
  requiresPrinting: boolean;
  discountPercent: number;
  modificationDate: string;
};

export default Campaign;
