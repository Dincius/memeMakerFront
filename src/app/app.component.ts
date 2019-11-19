import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public url: String;
  public context: CanvasRenderingContext2D


  @ViewChild("mycanvas", {static: false}) mycanvas;

    
  onTextFillTop(topText: string): void {
    this.context.font = "40px Impact";
    this.context.fillStyle = 'white'; 
    this.context.fillText(topText, 20, 50);
  }

  onTextFillBot(botText: string): void {  
    this.context.font = "40px Impact";
    this.context.fillStyle = 'white'; 
    let textY = this.mycanvas.nativeElement.height - 20;
    this.context.fillText(botText, 20, textY);
  }

  Preview(e: any): void {
    this.context = (<HTMLCanvasElement>this.mycanvas.nativeElement).getContext('2d');
    let ctx = this.context;
    console.log(ctx);
    let c = this.mycanvas.nativeElement;
    var render = new FileReader();
    render.onload = function(event: any) {
      var img = new Image();
      img.onload = function() {
        c.width = img.width;
        c.height = img.height;
        ctx.drawImage(img, 0, 0);
      
      }
      img.src = event.target.result;
    }
    render.readAsDataURL(e.target.files[0]);
  
  }

  onDownload() {
    var dataURL = this.mycanvas.nativeElement.toDataURL('image/png');
    this.url = dataURL;
  }

  Clear(): void {
    let canvas = this.mycanvas.nativeElement;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 302;
    canvas.height = 152;
  }

}
