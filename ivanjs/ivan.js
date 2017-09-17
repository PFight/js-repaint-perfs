var elements = {};

function tag(tagName, name, props, children) {
	let state = elements[name];
	if (!state) {
		state = elements[name] = 
			{ elem: document.createElement(tagName), props: {}, name: name, children: [], content: null};
	}
	for (let prop in props) {
		if (Reflect.getOwnPropertyDescriptor(props, prop)) {
			if (state.props[prop] != props[prop]) {
				state.props[prop] = props[prop];
				state.elem[prop] = props[prop];
			}
		}
	}
	if (typeof(children) == "string") {
		if (state.content != children) {
			state.content = children;
			state.elem.textContent = children;
		}
	} else {
		for (let child of children) {
			if (!state.children.find(function findChild(x){ return x == child })) {
				state.children.push(child);
				state.elem.appendChild(child);
			}
		}
		for (let child of state.children) {
			if (!children.find(function findChild(x){ return x == child})) {
				state.children.splice(state.children.indexOf(child), 1);
				state.elem.remove(child);
			}
		}
	}
	return state.elem;
}

function div(name, props, children) {
    return tag("div", name, props, children);
}
function span(name, props, children) {
    return tag("span", name, props, children);
}
function table(name, props, children) {
    return tag("table", name, props, children);
}

function tbody(name, props, children) {
    return tag("tbody", name, props, children);
}

function td(name, props, children) {
    return tag("td", name, props, children);
}
function tr(name, props, children) {
    return tag("tr", name, props, children);
}

function mount(container, elem) {
	let found = false;
	for (let child of container.children) {
		if (child == elem) {
			found = true;
		}
	}
	if (!found) {
		container.appendChild(elem);
	}
}
