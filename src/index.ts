export class point{
    x:number;
    y:number;
    public constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    compare(other:point) {
        return this.x==other.x && this.y==other.y;
    }
}

export class lineSegment{
    p:point;
    q:point;
    public constructor (p:point,q:point){
        this.p=p;
        this.q=q;
    }
    compare(other:lineSegment) {
        return (this.p.compare(other.p)&&this.q.compare(other.q))
        ||(this.p.compare(other.q)&&this.q.compare(other.p))
    }
}
export class Config{
    printGraph : boolean=false;
    drawRoute : boolean=true;
    printLevel : number= 0;
    k : number = 0;
    public constructor(){

    }
}

export var config=new Config();

export function setConfig(argc:number,argv:string[]) {
    for(var i = 1 ; i < argc ; i++ ){
        var s = argv[i];
        if(s==("-k")){
			config.k = Number(argv[i+1]);
		}
        if(s==("-p")){
			config.printGraph = true;
			if(argc-1>i){
				var temp=argv[i+1];
                var index=temp.search(/\D/);
                if(index!=-1){
                    config.printLevel=Number(temp[index]);
                }
			}
		}
    }
}
export function main(argc:number,argv:string[]) {
    
}