import { Controller, Get, Render,  Query, Body, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Product } from './product.interface.js';
import { CreateProductDto } from './create-product.dto.js';

@Controller()
export class AppController {
  
  private products: Product[] = [
    {
      "name": "Vezeték nélküli egér",
      "category": "elektronika",
      "price": 8990,
      "stock": 12
    },
    {
      "name": "Programozás kezdőknek",
      "category": "könyv",
      "price": 6490,
      "stock": 4
    },
    {
      "name": "Mechanikus billentyűzet",
      "category": "elektronika",
      "price": 24990,
      "stock": 3
    },
    {
      "name": "Fekete kapucnis pulóver",
      "category": "ruházat",
      "price": 12990,
      "stock": 8
    },
    {
      "name": "Catan társasjáték",
      "category": "játék",
      "price": 11990,
      "stock": 0
    },
    {
      "name": "USB-C töltőkábel",
      "category": "elektronika",
      "price": 4990,
      "stock": 25
    },
    {
      "name": "Adidas sportcipő",
      "category": "ruházat",
      "price": 27990,
      "stock": 2
    },
    {
      "name": "A kis herceg",
      "category": "könyv",
      "price": 3990,
      "stock": 15
    },
    {
      "name": "LEGO City rendőrségi állomás",
      "category": "játék",
      "price": 34990,
      "stock": 5
    },
    {
      "name": "Bluetooth hangszóró",
      "category": "elektronika",
      "price": 15990,
      "stock": 7
    }
  ];



  //index, filter, newProduct, create method
 @Get()
@Render('index')
index() {
  const productsCopy = [...this.products];
  productsCopy.sort((a, b) => {
    return a.price - b.price;
  });

  return {
    products: productsCopy,
  };
}

@Get('filter')
@Render('filter')
filter(@Query('category') category: string) {
  const filteredProducts = this.products.filter((product) => {
    return product.category === category;
  });
  //csokkeno
  filteredProducts.sort((a, b) => {
    return b.stock - a.stock;
  });

  return {
    products: filteredProducts,
  };
}

@Get('new')
@Render('new')
newProduct() {
  return {
    success: false,
  };
}

@Post('new')
@Render('new')
create(@Body() dto: CreateProductDto) {
  const price = Number(dto.price);
  const stock = Number(dto.stock);

  // product obj letrehozs
  const newProduct = {
    name: dto.name,
    category: dto.category,
    price: price,
    stock: stock,
  };

  //eredeti arrayre push
  this.products.push(newProduct);

  return {
    success: true,
  };
}
}