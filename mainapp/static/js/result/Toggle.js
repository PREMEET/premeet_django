export default class Toggle{
	constructor(container, itemCN, className){
		this.container = container;
		this.itemCN = itemCN;
		this.items = container.querySelectorAll('.'+itemCN);
		this.className = className;

		container.addEventListener('click',this.toggle.bind(this));
	}
	toggle(event){
		const targetCL = event.target.classList;
		const parentTargetCL = event.target.parentElement.classList;
		if(!targetCL.contains(this.itemCN)) return;
		parentTargetCL.toggle(this.className);
	}
}