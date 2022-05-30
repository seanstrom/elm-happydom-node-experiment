export const withAttrs = BaseElement =>
  class extends BaseElement {
    static get observedAttributes() {
      return []
    }

    getAttributes () {
      const getAttrs = (attrs, attrName) => {
        const attr = this.getAttribute(attrName) || (attrName !== 'style' ? this[attrName] : null)

        if (attr != null) {
          Object.assign(attrs, {
            [attrName]: attr
          })
        }

        return attrs
      }

      return this.constructor.observedAttributes.reduce(getAttrs, {})
    }
  }

export const withProps = BaseElement =>
  class extends BaseElement {
    getProps () {
      const attrs = this.getAttributes()
      return this.attrsToProps ? this.attrsToProps(attrs) : attrs
    }
  }

export const withCreate = BaseElement =>
  class extends BaseElement {
    constructor () {
      /**
       * Create section, add code here to configure element
       * before insertion into document or attributes are received.
      */

      super()
      console.log(`${this.constructor.name} created`)
    }
  }

export const withInitAndUpdate = BaseElement =>
  class extends BaseElement {
    attributeChangedCallback() {
      this.props = this.getProps()

      /**
       * Pre-Connect section, add code here to receive
       * initial attributes before connect.
      */

      if (!this.isConnected) {
        this.init(this.props)
        console.log(`${this.constructor.name} init`)
      }

      /**
       * Update section, add code here to manage updating
       * with new attributes after connect.
      */

      if (this.isConnected) {
        this.update(this.props, this.view)
        console.log(`${this.constructor.name} update`)
      }
    }
  }

export const withMountAndRender = BaseElement =>
  class extends BaseElement {
    connectedCallback() {
      /**
       * Connect section, add code here to configure initial render
       * and context for children.
      */

      if (this.isConnected) {
        this.props = this.getProps()
        this.view = this.render(this.props, {
          contentView: this.parentNode.view
        })

        console.log(`${this.constructor.name} connected`)
      }
    }
  }

export const withUnmount = BaseElement =>
  class extends BaseElement {
    disconnectedCallback() {
      this.view.dispose()
      console.log(`${this.constructor.name} disconnected`)
    }
  }
