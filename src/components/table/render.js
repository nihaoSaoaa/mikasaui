// 函数组件
export default {
  functional: true,
  props: {
    row: Object,
    col: Object,
    index: Number,
    render: Function
  },
  render(h, ctx) {
    const { row, col, index, render } = ctx.props;
    const params = { row, col, index };
    return render(h, params);
  }
}