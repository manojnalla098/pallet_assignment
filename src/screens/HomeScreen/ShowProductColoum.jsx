import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import SingleProduct from './SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/productSlice/ProductSlice';

const ShowProductColoum = ({ products }) => {
  const dispatch = useDispatch();

  const { productLoading, currentPage } = useSelector(state => state.product);

  const [isEndReached, setIsEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getProduct(1));
  }, [dispatch]);

  const loadMore = () => {
    if (!isEndReached && !productLoading) {
      setIsEndReached(true);
      dispatch(getProduct(currentPage + 1)).then(() => setIsEndReached(false));
    }
  };

  const renderItem = useCallback(({ item }) => {
    return <SingleProduct product={item} />;
  }, []);

  const keyExtractor = useCallback((item, index) => {
    return `${item?.id ?? 'item'}-${index}`;
  }, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: responsiveHeight(30),
      offset: responsiveHeight(30) * index,
      index,
    }),
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getProduct(1));
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [dispatch]);

  return (
    <View style={styles.productContainer}>
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(2) }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        windowSize={10}
        getItemLayout={getItemLayout}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          productLoading ? (
            <View style={{ padding: 10 }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default ShowProductColoum;

const styles = StyleSheet.create({
  productContainer: {
    width: responsiveScreenWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    width: '95%',
  },
});
