changeCarlist(state) {
    let oriCarlist = state.carlist;
    let cartList1 = {};

    oriCarlist.forEach(function(item, index) {
        //判断是否有规格，有规格的时候根据规格做拆分
        // debugger
        if (item.numList && Object.keys(item.numList).length !== 0) {
            // 遍历对象
            let spec = item.show_specification;

            //遍历item.numlist，根据里面的数据，组装spec,并组装一条购物车商品数据
            for (let key in item.numList) {
                // debugger;
                let newspec = [];
                //对象自身属性
                if (item.numList[key] > 0) {
                    key.split('').forEach(
                        function(item, index) {
                            let obj = {};
                            obj["title"] = spec[index].title;
                            obj["id"] = spec[index].list[item].id;
                            obj["spec"] = spec[index].list[item].title;

                            if (spec[index].type === 2) {
                                obj["original_price"] = spec[index].list[item].original_price || 0;
                                obj["discount_price"] = spec[index].list[item].discount_price || 0;
                                obj["vip_price"] = spec[index].list[item].vip_price || 0;
                                obj["festival_price"] = spec[index].list[item].festival_price || 0;
                                obj["isSize"] = true;
                            }

                            newspec.push(obj);
                        }
                    )

                    console.log(newspec);
                    //生成一条购物车商品，生成购物车里商品唯一标识
                    let str = item.food_id + Util.GetRandString(3);

                    //判断最终要使用的价格
                    let hasSize = true; //是否有size
                    let isSizeIdx;
                    newspec.forEach(
                        function(arrItem, index) {
                            if (arrItem.isSize) {
                                hasSize = false;
                                isSizeIdx = index;
                            }
                        }
                    )

                    let priceArr = [];
                    if (hasSize) {
                        for (let key in item.price) {
                            priceArr.push(item.price[key]);
                        }
                        //数组大小排序
                        priceArr.sort(function(a, b) {
                            return a - b;
                        });
                    } else {
                        priceArr.push(newspec[isSizeIdx].original_price);
                        priceArr.push(newspec[isSizeIdx].discount_price);
                        priceArr.push(newspec[isSizeIdx].vip_price);
                        priceArr.push(newspec[isSizeIdx].festival_price);

                        priceArr.sort(function(a, b) {
                            return a - b;
                        });
                    }

                    cartList1[str] = {
                        "food_id": item.food_id,
                        "food_name": item.food_name,
                        "foods_img": item.foods_img,
                        "month_sale": item.month_sale,
                        "praise": item.praise,
                        "num": item.numList[key], //主要拆分数量，这里与没有规格时候不同
                        "now_price": priceArr[0], //item.price,
                        "eating_num": item.eating_num || 0,
                        "is_packing": item.is_packing || false,
                        "packing_num": item.packing_num || 0,
                        "specs": newspec,
                        "packing_fee": item.packing_fee || 1.5
                    }
                }
            }
        } else {
            // debugger;
            //生成购物车里商品唯一标识
            let str = item.food_id + Util.GetRandString(3);

            //判断最终要使用的价格
            let priceArr = [];
            for (let key in item.price) {
                priceArr.push(item.price[key]);
            }
            //数组大小排序
            priceArr.sort(function(a, b) {
                return a - b;
            });


            cartList1[str] = {
                "food_id": item.food_id,
                "food_name": item.food_name,
                "foods_img": item.foods_img,
                "month_sale": item.month_sale,
                "praise": item.praise,
                "num": item.num,
                "now_price": priceArr[0], //item.price,
                "eating_num": item.eating_num || 0,
                "is_packing": item.is_packing || false,
                "packing_num": item.packing_num || 0,
                "packing_fee": item.packing_fee || 1.5
            }
        }
    })

    state.cart_list = cartList1
}