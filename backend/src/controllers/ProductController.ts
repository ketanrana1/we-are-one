import {
  Get,
  JsonController,
  Param,
  QueryParams,
} from 'routing-controllers';
import { Not, In } from 'typeorm';
import { OpenAPI } from 'routing-controllers-openapi';
import Product from 'app/entity/Product';
import { isNumeric } from 'helpers/common';

@JsonController('/products')
export default class ProductController {

  @Get('/')
  @OpenAPI({
    description: 'Get the list of all products available for selling',
  })
  async getAllProducts(@QueryParams() query: any) {
    try {
      let filter: any = {
        where: {
          enabled: true,
        },
        order: {
          position: 'ASC',
        },
      };

      if (query.onlyStocked) {
        filter = {
          ...filter,
          where: {
            ...filter.where,
            outOfStock: false,
          },
        };
      }

      if (query.limit) {
        filter = {
          ...filter,
          take: query.limit,
        };
      }

      if (query.related) {
        filter = {
          ...filter,
          where: {
            ...filter.where,
            id: Not(query.related),
            slug: Not(In(['premium-gift-box', 'all-flavours-pack'])),
          },
        };
      }

      const products = await Product.find(filter);

      return {
        success: true,
        data: products,
      };
    } catch (_err) {
      return {
        success: false,
        message: 'Invalid Request',
      };
    }
  }

  @Get('/:id')
  @OpenAPI({
    description: 'Get the single product data',
  })
  async getProduct(@Param('id') id: string) {
    try {
      let where: any = { id, enabled: true };
      if (!isNumeric(id)) {
        where = { slug: id, enabled: true };
      }
      const product = await Product.findOne({
        where,
      });
      if (product instanceof Product) {
        return {
          success: true,
          data: product,
        };
      }
      return {
        success: false,
        message: 'Invalid Product ID/Slug',
      };
    } catch (_err) {
      return {
        success: false,
        message: 'Invalid Request',
      };
    }
  }

}
