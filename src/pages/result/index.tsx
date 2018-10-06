import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtCard, AtList, AtListItem, AtButton } from "taro-ui";
import './index.scss'

type PageStateProps = {

};

type PageDispatchProps = {

};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Result {
  props: IProps;
}


class Result extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "计算结果"
  };

  state = {
    deduction: "0",
    five: "0",
    money: "0.00",
    preTax: "0.00",
    preTaxMoney: "0.00",
    rankIndex: "0",
    tax: "0.00",
    baseLine: 0,
    taxRate: 0,
    type: 0
  };
  componentWillMount = () => {
    console.info(this.$router.params);
    this.setState(this.$router.params);
  };
  render() {
    const {
      deduction,
      five,
      money,
      preTax,
      preTaxMoney,
      rankIndex,
      baseLine,
      tax,
      taxRate,
      type
    } = this.state;
    const img = require("../../assets/deamon.png");
    return <View className="result">
        <View className="doc-body">
          <View className="panel">
            {/* <View className="panel__title" /> */}
            <View className="panel__content no-padding">
              <View className="example-item">
              {type == 0 ? <AtCard extra={"¥" + tax} title="应纳个税" thumb={img}>
                    <AtList>
                      <AtListItem title="税前收入" extraText={"¥" + preTaxMoney} />
                      <AtListItem title="五险一金（个人缴纳部分）" extraText={"¥" + five} />
                  <AtListItem title="起征点" extraText={"¥" + baseLine} />
                      <AtListItem title="应纳税所得额" extraText={"¥" + preTax} />
                      <AtListItem title="税率" extraText={taxRate * 100 + "%"} />
                      <AtListItem title="速算扣除数" extraText={deduction} />
                      <AtListItem title="税后工资" extraText={"¥" + money} />
                    </AtList>
              </AtCard> : <AtCard extra={"¥" + preTaxMoney} title="税前收入" thumb={img}>
                    <AtList>
                      <AtListItem title="应纳个税" extraText={"¥" + tax} />
                    <AtListItem title="五险一金（个人缴纳部分）" extraText={"¥" + five} />
                    <AtListItem title="起征点" extraText={"¥" + baseLine} />
                      <AtListItem title="应纳税所得额" extraText={"¥" + preTax} />
                      <AtListItem title="税率" extraText={taxRate * 100 + "%"} />
                      <AtListItem title="速算扣除数" extraText={deduction} />
                      <AtListItem title="税后工资" extraText={"¥" + money} />
                    </AtList>
                  </AtCard>}
              </View>
            </View>
          </View>
          <View className="panel">
            <View className="panel__title">工资个人所得税计算公式</View>
            <View className="panel__content no-padding">
              <View className="example-item">
                <View className="at-article__p">
                  应纳税所得额 = 税前工资收入金额 － 五险一金(个人缴纳部分)
                  － 起征点
                </View>
                <View className="at-article__p">
                  应纳税额 = 应纳税所得额 x 税率 － 速算扣除数
                </View>
              </View>
            </View>
          </View>
          <View className="panel">
            <View className="panel__title">个人所得所率表</View>
            <View className="panel__content no-padding">
              <View className="example-item">
                <View className="center ">
                  <Image mode="widthFix" style={{ width: "100%", height: "auto" }} src={require("../../assets/table.png")} />
                </View>
              </View>
              {/* <View className="at-article__p">
                <AtButton openType="share">分享</AtButton>
                <AtButton openType="share">分享小程序</AtButton>
              </View> */}
            </View>
          </View>
        </View>
      </View>;
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Result as ComponentClass<PageOwnProps, PageState>;
