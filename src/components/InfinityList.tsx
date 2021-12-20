import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { IProducts } from '../Interface';
import Grid from './Grid';
import ProductCard from './ProductCard';

function InfinityList(props: { data: IProducts[] }) {
  const perLoad: number = 6;

  const listRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<IProducts[]>([]);

  const [load, setLoad] = useState<boolean>(true);

  const [index, setIndex] = useState<number>(0);

  React.useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          console.log('bottom reach');
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  React.useEffect(() => {
    (function getItems() {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;
      if (load && index <= maxIndex) {
        const start = perLoad + index;
        const end = start + perLoad;
        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    })();

    setLoad(true);
  }, [props, load, index, data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.length &&
          data.map((item, index) => (
            <ProductCard
              key={index}
              img01={item.image01}
              img02={item.image02}
              name={item.title}
              price={Number(item.price)}
              slug={item.slug}
            />
          ))}
      </Grid>
    </div>
  );
}

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
