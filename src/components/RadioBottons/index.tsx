


import { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtButton } from "taro-ui";

type CItem = {
  value: string | number
}


type CPorps = {
  className?: string;
  onChange: (v, index)=> {};
  current: number;
  list: CItem[];
};

type btnType = "primary" | "secondary" | undefined


export default class RadioButtons extends Component<CPorps>  {
  static defaultProps = {
    className: '',
    onChange: () => { },
    current: 0,
    list: []
  }
  state = {
    current: 0
  }
  constructor() {
    super(...arguments);
    this.state = { current: this.props.current };
  }
  handleChange = (v)=> {
    this.setState({ current: v });
    this.props.onChange(this.props.list[v].value, v);
  }
  componentWillReceiveProps(nexPorps){
    this.setState({ current: nexPorps.current });
  }
  render() {
    const { className, list } = this.props;
    const { current }  = this.state;
    const clsName = className || "flex-wrp"
    return <View className={clsName}>
        {list.map((v, index) => {
        let type: btnType = index == current ? "primary" : "secondary";
        return <AtButton type={type} key={index} onClick={this.handleChange.bind(this, index)} size="small">
            {v.value}
          </AtButton>;
        })}
      </View>;
  }
}



