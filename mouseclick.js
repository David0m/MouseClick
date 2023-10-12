const readline = require('readline');
const robot = require('robotjs');

class BasePattern {
  
   constructor() {
     this.stopped = false; // Переменная для остановки выполнения
  }


  async sleep(minMs, maxMs) {

    const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async moveMouse(startX, startY, endX, endY) {
    
    if (this.stopped) {
      return;
    }

    const mouse = robot.getMousePos();
    const deltaX = (endX - startX) / 100;
    const deltaY = (endY - startY) / 100;

    for (let i = 0; i < 100; i++) {

      const newX = Math.round(startX + deltaX * i);
      const newY = Math.round(startY + deltaY * i);

      robot.moveMouse(mouse.x + newX - startX, mouse.y + newY - startY);
      await this.sleep(10, 20);
  }
}

      stop() {
    // место для установки флага остановки и остановки любого текущего действия
      this.stopped = true;
  }
    

async pressAndReleaseKey(key) {
    robot.keyToggle(key, 'down');
    await this.sleep(200, 500);
    robot.keyToggle(key, 'up');
}

  async run() {

  }
}



class MousePattern extends BasePattern {
  async run() {
    if (this.stopped) {
      return;
    }

    const screenWidth = robot.getScreenSize().width;
    const screenHeight = robot.getScreenSize().height;

    const startX = Math.floor(Math.random() * screenWidth);
    const startY = Math.floor(Math.random() * screenHeight);
    const endX = Math.floor(Math.random() * screenWidth);
    const endY = Math.floor(Math.random() * screenHeight);
    
    await this.sleep(500, 1000);
    await this.moveMouse(startX, startY, endX, endY); 
    await this.sleep(500, 1000);
  }
}

class AltTabPattern extends BasePattern {
  async run() {
    if (this.stopped) {
      return;
    }
    
    const altTabCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < altTabCount; i++) {
      
      

      this.pressAndReleaseKey('alt');
      this.pressAndReleaseKey('tab');
      await this.sleep(100, 200);
    }
  }
}

class CtrlFPattern extends BasePattern {
  async run() {
  if (this.stopped) {
      return;
    }

  robot.keyToggle('control', 'down');
  await this.sleep(50, 100);
  robot.keyToggle('F', 'down');
  await this.sleep(50, 100);
  robot.keyToggle('F', 'up');
  await this.sleep(50, 100);
  robot.keyToggle('control', 'up');
  await this.sleep(200, 400);
  
  
  const searchQuery = 'example text';
  robot.typeString(searchQuery);
  
  
  await this.pressAndReleaseKey('enter');

}
 }



class MouseScrollPattern extends BasePattern {
  async run() {

    if (this.stopped) {
      return;
    }    
    
    const centerScreenX = Math.floor(robot.getScreenSize().width / 2);
    const centerScreenY = Math.floor(robot.getScreenSize().height / 2);

    await this.moveMouse(centerScreenX, centerScreenY, centerScreenX, centerScreenY + 100);
    robot.scrollMouse(0, -3);    
  }
}

class CtrlTabPattern extends BasePattern {
  async run() {
    if (this.stopped) {
      return;
    }    

    this.pressAndReleaseKey('control');
    this.pressAndReleaseKey('tab');
    await this.sleep(200, 400);
  }
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


  const mousePattern = new MousePattern();
  const altTabPattern = new AltTabPattern();
  const ctrlFPattern = new CtrlFPattern();
  const mouseScrollPattern = new MouseScrollPattern();
  const ctrlTabPattern = new CtrlTabPattern();

process.stdin.on('keypress', (str, key) => {
  if(key.name === 'q') {
    mousePattern.stop();
    altTabPattern.stop();
    ctrlFPattern.stop();
    mouseScrollPattern.stop();
    ctrlTabPattern.stop();

    setTimeout(() => process.exit(0), 1000); // даем время для завершения всех операций
  }
});

(async () => {

  await mousePattern.run();
  await altTabPattern.run();
  await ctrlFPattern.run();
  await mouseScrollPattern.run();
  await ctrlTabPattern.run();
})();