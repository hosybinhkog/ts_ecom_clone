import React, { useCallback, useRef, useState } from 'react';
import Grid from '../components/Grid';
import Helmet from '../components/Helmet';
import ProductCard from '../components/ProductCard';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

import products from '../assets/fake-data/products';
import category from '../assets/fake-data/category';
import colors from '../assets/fake-data/product-color';
import sizes from '../assets/fake-data/product-size';
import { IItemFilter } from '../Interface';

const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const productList = products.getAllProducts();

  const [product, setPropduct] = useState(productList);

  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type: string, checked: boolean | null, item: IItemFilter) => {
    if (checked) {
      switch (type) {
        case 'CATEGORY':
          setFilter({ ...filter, category: [...filter.category, item.categorySlug as never] });
          break;
        case 'SIZE':
          setFilter({ ...filter, size: [...filter.size, item.size as never] });
          break;
        case 'COLOR':
          setFilter({ ...filter, color: [...filter.color, item.color as never] });
          break;
        default:
      }
    } else {
      switch (type) {
        case 'CATEGORY':
          const newCategory = filter.category.filter((e) => e !== item.categorySlug);
          setFilter({ ...filter, category: newCategory });
          break;
        case 'COLOR':
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case 'SIZE':
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };

  function clearIntervalFilter() {
    setFilter(initFilter);
  }

  const updateProducts = useCallback(() => {
    let temp = productList;
    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug as never));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color as never));
        return check !== undefined;
      });
    }

    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size as never));
        return check !== undefined;
      });
    }

    setPropduct(temp);
  }, [filter, productList]);

  React.useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef<HTMLDivElement>(null);

  const showHideFilter = () => filterRef.current && filterRef.current.classList.toggle('active');

  return (
    <Helmet title="Sản Phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__filter__close" onClick={() => showHideFilter()}>
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__Widget">
            <div className="catalog__filter__widget__title">Danh mục sản phẩm</div>
            <div className="catalog__filter__widget__content">
              {category &&
                category.map((item, index) => (
                  <div className="catalog__filter__widget__content__item" key={index}>
                    <Checkbox
                      label={item.display}
                      onChange={(input) => filterSelect('CATEGORY', input && input.checked, item)}
                      checked={filter.category.includes(item.categorySlug as never)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="catalog__filter__Widget">
            <div className="catalog__filter__widget__title">Màu sản phẩm</div>
            <div className="catalog__filter__widget__content">
              {colors &&
                colors.map((item, index) => (
                  <div className="catalog__filter__widget__content__item" key={index}>
                    <Checkbox
                      label={item.display}
                      onChange={(input) => filterSelect('COLOR', input && input.checked, item)}
                      checked={filter.color.includes(item.color as never)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="catalog__filter__Widget">
            <div className="catalog__filter__widget__title">Size sản phâm</div>
            <div className="catalog__filter__widget__content">
              {sizes &&
                sizes.map((item, index) => (
                  <div className="catalog__filter__widget__content__item" key={index}>
                    <Checkbox
                      label={item.display}
                      onChange={(input) => filterSelect('SIZE', input && input.checked, item)}
                      checked={filter.size.includes(item.size as never)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button backgroundColor="blue" size="sm" onclick={() => clearIntervalFilter()}>
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__content">
          <Grid col={3} mdCol={2} smCol={1} gap={10}>
            {product.map((item, index) => (
              <ProductCard
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                key={index}
                slug={item.slug}
              />
            ))}
          </Grid>
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
