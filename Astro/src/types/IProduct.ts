export default interface IProduct{
	id:number|string
	attributes:{
		UID:string
		Title:string
		Price:number
		Image:{
			data:{
				attributes:{
					url:string
				}
			}
		}
	}
}