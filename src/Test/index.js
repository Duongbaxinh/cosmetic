"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var createProductWithImages = function (productData) { return __awaiter(void 0, void 0, void 0, function () {
    var dataFilter, createProductResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dataFilter = productData.map(function (product) {
                    var product_images = product.product_images, productBody = __rest(product, ["product_images"]);
                    return productBody;
                });
                return [4 /*yield*/, axios_1.default.post("https://joyboybe-production.up.railway.app/products", dataFilter, {
                        headers: {
                            Authorization: "Bearer Pvso7TXTm0hL77yNtxL0n7fK27xI5k",
                        },
                    })];
            case 1:
                createProductResponse = _a.sent();
                if (createProductResponse.data) {
                    // const imagePayload = product_images.map((url, index) => ({
                    //   product_id: productData.product_name,
                    //   image_url: url,
                    //   alt_text: productData.product_name,
                    // }));
                    // await axios.post(
                    //   "https://joyboybe-production.up.railway.app/product-images",
                    //   imagePayload,
                    //   {
                    //     headers: {
                    //       Authorization: `Bearer AKVlALtnZ1jWtgXubBTT6NOJgfueB7`,
                    //     },
                    //   }
                    // );
                    console.log("Tạo sản phẩm và ảnh thành công");
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Lỗi khi tạo sản phẩm hoặc ảnh:", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var rawProducts = [
    {
        product_brand: "THE WHOO",
        product_description: "Quis natus modi qui ",
        product_discount: false,
        product_discount_end: "2017-05-08",
        product_discount_percent: 43,
        product_discount_start: "2003-12-19",
        product_expiration_date: "1977-01-28",
        product_images: [
            "blob:http://localhost:3000/bc267292-b216-479e-809c-45432d2ab24e",
        ],
        product_ingredient: "Labore dolor cillum ",
        product_international: false,
        product_made: "Unde exercitationem ",
        product_name: "Shafira Cervantes",
        product_price: 5680000,
        product_promotion_id: "Giảm 40%",
        product_stock_quantity: 83,
        product_thumbnail: "https://res.cloudinary.com/dwu92ycra/image/upload/v1748920473/JOYBOY/u8gydvcegxymve3v2waj.webp",
        product_type: "Tẩy tế bào chết cơ thể",
        images: [],
    },
    {
        product_brand: "OBBAGI",
        product_description: "Fuga Totam qui odit",
        product_discount: false,
        product_discount_end: "",
        product_discount_percent: 0,
        product_discount_start: "",
        product_expiration_date: "1982-05-13",
        product_images: [],
        product_ingredient: "Eos alias incididunt",
        product_international: true,
        product_made: "Duis ipsum esse ut",
        product_name: "Liberty Velez",
        product_price: 20000,
        product_promotion_id: "Giảm 50%",
        product_stock_quantity: 576,
        product_thumbnail: "https://res.cloudinary.com/dwu92ycra/image/upload/v1748920473/JOYBOY/u8gydvcegxymve3v2waj.webp",
        product_type: "Son Thỏi",
        images: [],
    },
];
createProductWithImages(rawProducts);
