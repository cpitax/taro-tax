import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtTabs, AtTabsPane } from "taro-ui";
import RadioButtons from "../../components/RadioBottons";
import { calc, calcReverse } from "../../logic/core";
import { params } from "../../utils";

import './index.scss'



type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}


class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "查个税2018"
  };

  state = {
    income: "",
    incomeAT: "",
    insure: "",
    baseLine: 5000,

    // view control
    tabcurrent: 0,
    baseLineCurrent: 2,
    baseLineData: [{ value: 3500 }, { value: 4800 }, { value: 5000 }]
  };
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }



  handleChange = (type, e, index) => {
    this.setState({
      [type]: e
    });
    if (type == "baseLine") {
      this.setState({ baseLineCurrent: index });
    }
  };
  handleTabClick = (a, b) => {
    this.setState({ tabcurrent: a });
  };
  calcHandle = () => {
    const { income, incomeAT, insure, baseLine } = this.state;
    let sc = {};
    if (this.state.tabcurrent == 0) {
      sc = calc(income, insure, baseLine);
    } else {
      sc = calcReverse(incomeAT, insure, baseLine);
    }
    sc = { ...sc, type: this.state.tabcurrent, baseLine: baseLine };
    Taro.navigateTo({ url: "/pages/result/index?" + params(sc)});
  };
  render() {
    const { baseLineData, baseLineCurrent, tabcurrent } = this.state;
    return <View className="index">
        <AtTabs current={tabcurrent} tabList={[{ title: "正算税后" }, { title: "反推税前" }]} onClick={this.handleTabClick}>
          <AtTabsPane current={tabcurrent} index={0}>
            <View style="font-size:18px;text-align:right;">
              <AtForm className="form">
              <AtInput name="income" title="税前工资" type="number" autoFocus placeholder="税前工资" placeholderClass="text-right" value={this.state.income} onChange={this.handleChange.bind(this, "income")} />
                <AtInput name="insure" title="五险一金" type="number" placeholder="五险一金（个人缴纳部分）" placeholderClass="text-right" value={this.state.insure} onChange={this.handleChange.bind(this, "insure")} />

                <View className="field">
                  <View className="field-title">起征点</View>
                  <View className="field-content">
                    <RadioButtons current={baseLineCurrent} list={baseLineData} onChange={this.handleChange.bind(this, "baseLine")} />
                  </View>
                </View>
              </AtForm>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabcurrent} index={1}>
            <View style="font-size:18px;text-align:right;">
              <AtForm className="form">
                <AtInput name="incomeAT" title="税后所得" type="number" placeholder="税后所得" placeholderClass="text-right" value={this.state.incomeAT} onChange={this.handleChange.bind(this, "incomeAT")} />
                <AtInput name="insure" title="五险一金" type="number" placeholder="五险一金（个人缴纳部分）" placeholderClass="text-right" value={this.state.insure} onChange={this.handleChange.bind(this, "insure")} />
                <View className="field">
                  <View className="field-title">起征点</View>
                  <View className="field-content">
                    <RadioButtons current={baseLineCurrent} list={baseLineData} onChange={this.handleChange.bind(this, "baseLine")} />
                  </View>
                </View>
              </AtForm>
            </View>
          </AtTabsPane>
        </AtTabs>
        <View>
          <AtButton className="subbtn" onClick={this.calcHandle} type="primary" size="normal">
            开始计算
          </AtButton>
        </View>
        <View className="tips">
          <View className="at-article__p1">
            五险一金各单位缴存比例不一，根据实际情况输入；
          </View>
          <View className="at-article__p1">
            港澳台及外籍人士起征点为¥4800；
          </View>
          <View className="at-article__p1">
            2018年10月1号实施新的个税法案，起征点为¥ 5000
          </View>
        </View>
        {
          process.env.TARO_ENV === 'weapp' &&
          <View className="at-article__p">
            <AtButton openType="share">分享</AtButton>
          </View>
        }
        {
          process.env.TARO_ENV === 'h5' &&
          <View className="full">
            <Image mode="widthFix" style={{ width: "100%", height: "auto" }} src={require("../../assets/wechat.png")} />
          </View>
        }
      </View>;
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
