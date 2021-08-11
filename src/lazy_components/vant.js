import {
  Icon,
  Button,
  Toast,
  Form,
  Field,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
  Checkbox,
  Uploader,
  Tag,
  Circle,
  Popup,
  Dialog,
  Empty,
  Collapse,
  CollapseItem,
  PasswordInput,
  NumberKeyboard,
  DatetimePicker,
  Tab,
  Tabs,
  PullRefresh,
  List,
  Picker,
  NavBar,
  Image as VanImage
} from 'vant'

Toast.setDefaultOptions('loading', { forbidClick: true })

export default app => {
  app.use(Icon)
  app.use(Button)
  app.use(Form)
  app.use(Field)
  app.use(Cell)
  app.use(CellGroup)
  app.use(Checkbox)
  app.use(Radio)
  app.use(RadioGroup)
  app.use(Uploader)
  app.use(Tag)
  app.use(Circle)
  app.use(VanImage)
  app.use(Popup)
  app.use(Dialog)
  app.use(Empty)
  app.use(Collapse)
  app.use(CollapseItem)
  app.use(PasswordInput)
  app.use(NumberKeyboard)
  app.use(DatetimePicker)
  app.use(Tab)
  app.use(Tabs)
  app.use(PullRefresh)
  app.use(List)
  app.use(NavBar)
  app.use(Picker)
  app.config.globalProperties.$toast = Toast
}
