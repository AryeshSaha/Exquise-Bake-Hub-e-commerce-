export default function handler(req, res) {
  const pincodes = {
    700001: ["Kolkata", "West Bengal"],
    600001: ["Chennai", "Tamil Nadu"],
    560001: ["Bangalore", "Karnataka"],
    110001: ["Delhi", "Delhi"],
    400001: ["Mumbai", "Maharashtra"],
  };
  res.status(200).json({ pincodes });
}
