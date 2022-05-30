import { attrsToProps, propNamesToAttrNames, toAttrNameMap } from '../helpers'

const App = {
  init (props) {},
  update (props, view) {},
  render (props, context, handlers) {
    return null
  },
}

App.asElement = (UIElement) =>
  class AppElement extends UIElement {
    constructor() {
      super()
      const http = require('http');

      const requestListener = (req, res) => {
        this.dispatchEvent(new CustomEvent('app-request', {
          detail: {
            callback: (text) => {
              res.writeHead(200);
              res.end(text)
            }
          }
        }))
      }

      http.createServer(requestListener).listen(8080)
    }

    static get observedAttributes() {
      return App.attributeNames
    }

    init = App.init
    update = App.update
    render = App.render
    attrsToProps = App.attrsToProps
  }

App.tagName = 'x-app'
App.propNames = []
App.attributeNames = propNamesToAttrNames(App.propNames)
App.attributeNameMap = toAttrNameMap(App.attributeNames, App.propNames)
App.attrsToProps = attrsToProps(App.attributeNameMap)

export default App
