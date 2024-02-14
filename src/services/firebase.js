// Software Development Kit
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
  addDoc,
  limit,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import cosechaTardiaBlanco from "../assets/img/cosecha-tardia-blanco.jpg"
//1. Iniciar la conexión a Firestore


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK9vb99uYY39dMZqVB6icXu4tCD0o3-OI",
  authDomain: "vinoslaharolda.firebaseapp.com",
  projectId: "vinoslaharolda",
  storageBucket: "vinoslaharolda.appspot.com",
  messagingSenderId: "943017877242",
  appId: "1:943017877242:web:95a247f4efe3516591f343"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function testApp() {
  console.log("Conectandonos a firestore", db);
}

//1. Obtener un producto
export async function getSingleItem(itemid) {
  const docRef = doc(db, "products", itemid);
  const snapshot = await getDoc(docRef);

  //return  {...snapshot.data(), id: snapshot.id};
  const docData = snapshot.data();
  docData.id = snapshot.id;
  return docData;
}

export async function getSingleItem2(itemid) {
  const docRef = doc(db, "products2", itemid);
  const snapshot = await getDoc(docRef);

  //return  {...snapshot.data(), id: snapshot.id};
  const docData = snapshot.data();
  docData.id = snapshot.id;
  return docData;
}

//2. Obtener todos los productos para el ILC
export async function getItems() {
  const productsCollection = collection(db, "products");

  const q = query(
    productsCollection,
    orderBy("index"),
    orderBy("price"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);

  const dataDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return dataDocs;
}

export function getItemsPromise() {
  return new Promise((resolve, reject) => {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, orderBy("index"), limit(10));

    getDocs(q).then((querySnapshot) => {
      const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      resolve(dataDocs);
    });
  });
}

export function getItemsPromisePg2() {
  return new Promise((resolve, reject) => {
    const productsCollectionRef = collection(db, "products2");
    const q = query(productsCollectionRef, orderBy("index"), limit(10));

    getDocs(q).then((querySnapshot) => {
      const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      resolve(dataDocs);
    });
  });
}

export async function getItemsByPricePromise() {
  return new Promise((resolve, reject) => {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, where("price", "<", 100));

    getDocs(q).then((querySnapshot) => {
      const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      resolve(dataDocs);
    });
  });

}
  export async function getItemsByPricePromise50() {
    return new Promise((resolve, reject) => {
      const productsCollectionRef = collection(db, "products");
      const q = query(productsCollectionRef, where("price", "<", 50));
  
      getDocs(q).then((querySnapshot) => {
        const dataDocs = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        resolve(dataDocs);
      });
    });

}

//3. Obtener los productos según su category
// export async function getItemsByCategory(idcategory) {
//   const productsCollectionRef = collection(db, "products");

//   const q = query(productsCollectionRef, where("category", "==", idcategory));

//   const querySnapshot = await getDocs(q);

//   const dataDocs = querySnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   console.log(dataDocs);
// }

export async function getItemsByCategory(idcategory) {
  
  
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, where("category", "==", idcategory));

    const querySnapshot = await getDocs(q);
    return new Promise((resolve, reject) => {
    

    getDocs(q).then((querySnapshot) => {
      const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      resolve(dataDocs);
    });
  });
}

export function getItemsByPrice() {
  return new Promise((resolve, reject) => {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, where("price", "<", 100));

    getDocs(q).then((querySnapshot) => {
      const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      resolve(dataDocs);
    });
  });
}

export async function createBuyOrder(order) {
  const ordersCollection = collection(db, "orders");

  const orderDoc = await addDoc(ordersCollection, order);
  return orderDoc.id;
  // resolve(orderDoc.id)
}

export async function exportData() {
  const productsCollectionRef = collection(db, "products");

  const products = [
    {
      id: 1,
      title: "Vino Blanco Estancia Mendoza Chenin Chardonay Dulce X 750 Ml",
      price: 109.95,
      description:
        "Vino Blanco Estancia Mendoza Chenin Chardonay Dulce x 750 ml",
      category: "Vinos blancos",
      discount: 25,
      stock: 10,
      imgurl: "http://d2r9epyceweg5n.cloudfront.net/stores/001/160/839/products/004-008-050_vino-blanco-estancia-mendoza-chardonay-chenin-dulce-x-750-ml1-8c2154a3afec94167e15956147802100-640-0.jpg"
    },
    {
      id: 2,
      title: "VINO EMILIA DULCE NATURAL 750 ML",
      price: 22.3,
      description:
        "De un amarillo tenue que vira levemente al color acero.",
      category: "Vinos blancos",
      stock: 10,
      imgurl:
        "https://acdn.mitiendanube.com/stores/001/211/660/products/d596c107-1c10-4add-824f-b0aa22958e9f1-627595430f4f57616816692157643663-480-0.webp",
    },
    {
      id: 3,
      title: "Malbec Vino Tinto - Estancia Mendoza",
      price: 55.99,
      description:
        "De un intenso sabor a frutas rojas y un aroma floral.",
      category: "Vinos tintos",
      stock: 10,
      imgurl: "https://www.gustoargentino.com/cdn/shop/products/estancia-mendoza-vino-tinto-malbec.jpg",
    },
    {
      id: 4,
      title: "Trivento Reserve Malbec 2021",
      price: 15.99,
      description:
        "Mezcla igual de uvas de Luján de Cuyo y el Valle de Uco",
      category: "Vinos tintos",
      stock: 10,
      imgurl: "https://viners.com.ar/cdn/shop/products/trivento-reserve-malbec-2018-vino-trivento-501353.jpg",
    },
    {
      id: 5,
      title:
        "Vino Trumpeter Malbec 750ml",
      price: 695,
      description:
        "Roble 30% americano nuevo, 30% francés nuevo y 40% americano de 2do. y 3er. uso",
      category: "Vinos blancos",
      discount: 15,
      stock: 10,
      imgurl:
        "https://01almacen.com.ar/cdn/shop/products/VINO-TRUMPETER-MALBEC-750ML_aa6eb8_13966_500x.jpg",
    },
    {
      id: 6,
      title: "Vino blanco Torrontés Cafayate bodega Etchart 750 ml",
      price: 168,
      description: "Uvas maduras, durazno, lima y flores blancas",
      category: "Vinos blancos",
      discount: 15,
      stock: 10,
      imgurl:
        "https://http2.mlstatic.com/D_NQ_NP_906258-MLA45296333960_032021-O.webp",
    },
    {
      id: 7,
      title: "CESILIA BLANC 2021",
      price: 9.99,
      description:
        "Serias notas de fruta potente que suscitan una pausa para su deleite en buena compañía.",
      category: "Vinos blancos",
      stock: 10,
      imgurl:
        "https://casasicilia1707.es/wp-content/uploads/2021/01/Cesilia-Blanc-2019.png",
    },
    {
      id: 8,
      title: "AD GAUDE BLANCO 2021",
      price: 10.99,
      description:
        "La evidencia que la elegancia y potencia tienen como convivir. Untuosidad y distinción para los gustos más exigentes.",
      category: "Vinos blancos",
      stock: 10,
      imgurl:
        "https://casasicilia1707.es/wp-content/uploads/2021/01/Ad-Gaude-2019.png",
    },
    // {
    //   id: 9,
    //   title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    //   price: 64,
    //   description:
    //     "USB 3.0 and USB 2.0 Compatibility Fast data transf…ser’s hardware configuration and operating system",
    //   category: "electronics",
    //   stock: 20,
    //   imgurl: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    // },
    // {
    //   id: 10,
    //   title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    //   price: 109,
    //   description:
    //     "Easy upgrade for faster boot up, shutdown, applica…drive capacity, host device, OS and application.)",
    //   category: "electronics",
    //   stock: 20,
    //   imgurl: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    // },
    // {
    //   id: 11,
    //   title:
    //     "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    //   price: 109,
    //   description:
    //     "3D NAND flash are applied to deliver high transfer…e optimized performance and enhanced reliability.",
    //   category: "electronics",
    //   discount: 10,
    //   stock: 20,
    //   imgurl: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    // },
    // {
    //   id: 12,
    //   title:
    //     "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    //   price: 114,
    //   description:
    //     "Expand your PS4 gaming experience, Play anywhere F… capacity, 3-year manufacturer's limited warranty",
    //   category: "electronics",
    //   stock: 20,
    //   imgurl: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    // },
    // {
    //   id: 13,
    //   title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    //   price: 599,
    //   description:
    //     "21. 5 inches Full HD (1920 x 1080) widescreen IPS …egree. Vertical viewing angle-178 degree 75 hertz",
    //   category: "electronics",
    //   stock: 20,
    //   imgurl: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    // },
    // {
    //   id: 14,
    //   title:
    //     "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    //   price: 999.99,
    //   description:
    //     "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR…inate motion blur, ghosting, and reduce input lag",
    //   category: "electronics",
    //   stock: 20,
    //   imgurl: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    // },
    // {
    //   id: 15,
    //   title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    //   price: 56.99,
    //   description:
    //     "Note:The Jackets is US standard size, Please choos…t season and help you adapt to different climates",
    //   category: "women's clothing",
    //   discount: 25,
    //   stock: 10,
    //   imgurl: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    // },
    // {
    //   id: 16,
    //   title:
    //     "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    //   price: 29.95,
    //   description:
    //     "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75…ASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    //   category: "women's clothing",
    //   stock: 10,
    //   imgurl: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    // },
    // {
    //   id: 17,
    //   title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    //   price: 39.99,
    //   description:
    //     "Lightweight perfet for trip or casual wear---Long …djustable Drawstrings give it a real styled look.",
    //   category: "women's clothing",
    //   stock: 10,
    //   discount: 25,
    //   imgurl: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    // },
    // {
    //   id: 18,
    //   title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    //   price: 9.85,
    //   description:
    //     "95% RAYON 5% SPANDEX, Made in USA or Imported, Do …ves and neckline / Double stitching on bottom hem",
    //   category: "women's clothing",
    //   stock: 10,
    //   imgurl: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    // },
    // {
    //   id: 19,
    //   title: "Opna Women's Short Sleeve Moisture",
    //   price: 7.95,
    //   description:
    //     "100% Polyester, Machine wash, 100% cationic polyes…sleek, more feminine silhouette and Added Comfort",
    //   category: "women's clothing",
    //   stock: 10,
    //   imgurl: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    // },
    // {
    //   id: 20,
    //   title: "DANVOUY Womens T Shirt Casual Cotton Short",
    //   price: 12.99,
    //   description:
    //     "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    //   category: "women's clothing",
    //   stock: 10,
    //   imgurl: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    // },
  ];

  //products.forEach( item =>)
  for (let item of products) {
    item.index = item.id;
    delete item.id;
    addDoc(productsCollectionRef, item).then((res) =>
      console.log("Documento creado:", res.id)
    );
  }
}

export async function exportDataWithBatch() {
  const productsCollectionRef = collection(db, "products");
  const batch = writeBatch(db);

  const products = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in th…to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      discount: 25,
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, t…e round neckline includes a three-button placket.",
      category: "men's clothing",
      stock: 10,
      imgurl:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, …and or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on t…uld be reviewed below on the product description.",
      category: "men's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    },
    {
      id: 5,
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired…th love and abundance, or outward for protection.",
      category: "jewelery",
      discount: 15,
      stock: 10,
      imgurl:
        "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      id: 6,
      title: "Solid Gold Petite Micropave ",
      price: 168,
      description:
        "Satisfaction Guaranteed. Return or exchange any or…eed. Return or exchange any order within 30 days.",
      category: "jewelery",
      discount: 15,
      stock: 10,
      imgurl:
        "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      id: 7,
      title: "White Gold Plated Princess",
      price: 9.99,
      description:
        "Classic Created Wedding Engagement Solitaire Diamo…agement, Wedding, Anniversary, Valentine's Day...",
      category: "jewelery",
      stock: 10,
      imgurl:
        "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,
      description:
        "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      category: "jewelery",
      stock: 10,
      imgurl:
        "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      id: 9,
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
      price: 64,
      description:
        "USB 3.0 and USB 2.0 Compatibility Fast data transf…ser’s hardware configuration and operating system",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    },
    {
      id: 10,
      title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109,
      description:
        "Easy upgrade for faster boot up, shutdown, applica…drive capacity, host device, OS and application.)",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    },
    {
      id: 11,
      title:
        "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      price: 109,
      description:
        "3D NAND flash are applied to deliver high transfer…e optimized performance and enhanced reliability.",
      category: "electronics",
      discount: 10,
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    },
    {
      id: 12,
      title:
        "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: 114,
      description:
        "Expand your PS4 gaming experience, Play anywhere F… capacity, 3-year manufacturer's limited warranty",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    },
    {
      id: 13,
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: 599,
      description:
        "21. 5 inches Full HD (1920 x 1080) widescreen IPS …egree. Vertical viewing angle-178 degree 75 hertz",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    },
    {
      id: 14,
      title:
        "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
      price: 999.99,
      description:
        "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR…inate motion blur, ghosting, and reduce input lag",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    },
    {
      id: 15,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description:
        "Note:The Jackets is US standard size, Please choos…t season and help you adapt to different climates",
      category: "women's clothing",
      discount: 25,
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    },
    {
      id: 16,
      title:
        "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description:
        "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75…ASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    },
    {
      id: 17,
      title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: 39.99,
      description:
        "Lightweight perfet for trip or casual wear---Long …djustable Drawstrings give it a real styled look.",
      category: "women's clothing",
      stock: 10,
      discount: 25,
      imgurl: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    },
    {
      id: 18,
      title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
      price: 9.85,
      description:
        "95% RAYON 5% SPANDEX, Made in USA or Imported, Do …ves and neckline / Double stitching on bottom hem",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    },
    {
      id: 19,
      title: "Opna Women's Short Sleeve Moisture",
      price: 7.95,
      description:
        "100% Polyester, Machine wash, 100% cationic polyes…sleek, more feminine silhouette and Added Comfort",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    },
    {
      id: 20,
      title: "DANVOUY Womens T Shirt Casual Cotton Short",
      price: 12.99,
      description:
        "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    },
  ];

  //products.forEach( item =>)
  for (let item of products) {
    item.index = item.id;
    delete item.id;

    const newDoc = doc(productsCollectionRef);
    batch.set(newDoc, item);
  }

  const commitDone = await batch.commit();
  console.log("--->", commitDone);
}

export async function exportDataWithBatch2() {
  const productsCollectionRef = collection(db, "products2");
  const batch = writeBatch(db);

  const products = [
    {
      id: 10,
      title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109,
      description:
        "Easy upgrade for faster boot up, shutdown, applica…drive capacity, host device, OS and application.)",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    },
    {
      id: 11,
      title:
        "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      price: 109,
      description:
        "3D NAND flash are applied to deliver high transfer…e optimized performance and enhanced reliability.",
      category: "electronics",
      discount: 10,
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    },
    {
      id: 12,
      title:
        "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: 114,
      description:
        "Expand your PS4 gaming experience, Play anywhere F… capacity, 3-year manufacturer's limited warranty",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    },
    {
      id: 13,
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: 599,
      description:
        "21. 5 inches Full HD (1920 x 1080) widescreen IPS …egree. Vertical viewing angle-178 degree 75 hertz",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    },
    {
      id: 14,
      title:
        "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
      price: 999.99,
      description:
        "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR…inate motion blur, ghosting, and reduce input lag",
      category: "electronics",
      stock: 20,
      imgurl: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    },
    {
      id: 15,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description:
        "Note:The Jackets is US standard size, Please choos…t season and help you adapt to different climates",
      category: "women's clothing",
      discount: 25,
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    },
    {
      id: 16,
      title:
        "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description:
        "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75…ASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    },
    {
      id: 17,
      title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: 39.99,
      description:
        "Lightweight perfet for trip or casual wear---Long …djustable Drawstrings give it a real styled look.",
      category: "women's clothing",
      stock: 10,
      discount: 25,
      imgurl: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    },
    {
      id: 18,
      title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
      price: 9.85,
      description:
        "95% RAYON 5% SPANDEX, Made in USA or Imported, Do …ves and neckline / Double stitching on bottom hem",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    },
    {
      id: 19,
      title: "Opna Women's Short Sleeve Moisture",
      price: 7.95,
      description:
        "100% Polyester, Machine wash, 100% cationic polyes…sleek, more feminine silhouette and Added Comfort",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    },
    {
      id: 20,
      title: "DANVOUY Womens T Shirt Casual Cotton Short",
      price: 12.99,
      description:
        "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
      category: "women's clothing",
      stock: 10,
      imgurl: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    },
  ];

  //products.forEach( item =>)
  for (let item of products) {
    item.index = item.id;
    delete item.id;

    const newDoc = doc(productsCollectionRef);
    batch.set(newDoc, item);
  }

  const commitDone = await batch.commit();
  console.log("--->", commitDone);
}