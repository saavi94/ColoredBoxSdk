(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 11px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
	`;

	class ColoredBox extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
          let _this = this;
          document.addEventListener('propertiesChanged', function(data) {
            _this.onCustomWidgetAfterUpdate(data.detail.properties);
            console.log(data.detail.properties);
          });
		 this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["border-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				//this.style["border-radius"] = changedProperties["opacity"];
				this.style["border-width"] = changedProperties["opacity"]+"px";
			}
		}
	}

	customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();

(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Manage Box Properties</legend>
				<table>
					<tr>
						<td>Border Width</td>
						<td><input id="bps_opacity" type="text" size="5" maxlength="5"></td>
					</tr>
				</table>
				<input type="submit" >
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class ColoredBoxBps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    bubbles: true,
					detail: {
						properties: {
							opacity: this.opacity
						}
					}
			}));
		}

		set opacity(newOpacity) {
			this._shadowRoot.getElementById("bps_opacity").value = newOpacity;
		}

		get opacity() {
			return this._shadowRoot.getElementById("bps_opacity").value;
		}
	}

	customElements.define("com-sap-sample-coloredbox-bps", ColoredBoxBps);
})();

(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Set Color</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="sps_color" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit">
			</fieldset>
		</form>
	`;

	class ColoredBoxSps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    bubbles: true,
					detail: {
						properties: {
							color: this.color
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("sps_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("sps_color").value;
		}
	}

customElements.define("com-sap-sample-coloredbox-sps", ColoredBoxSps);
  })();


