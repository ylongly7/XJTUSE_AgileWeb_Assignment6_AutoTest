describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });
	//测试标题是否正确
    it('测试标题是否正确', async function() {
        expect(await page.title()).to.eql('React App');
    })
	
	it('测试能否顺利添加三个待办事项', async function() {
         
		await page.click('#btn_add', {delay: 500});
		await page.click('#btn_add', {delay: 500});
		await page.click('#btn_add', {delay: 500});
		const listcontent = await page.waitFor('#listcontent');
		let arr = await listcontent.$$("div")
		//console.log(arr.length)
		expect(arr.length).to.eql(3);
    })
	
	it('测试新加的待办事项的默认内容是否正确', async function() {
        
		let val = await page.$eval("#input1", el=>el.value)
		//console.log(val)
		expect(val).to.eql("备忘录内容2");
    })
	
	it('测试能否标记待办事项的状态', async function() {        
		await page.click('#btn_changests2', {delay: 500});
		let val = await page.$eval("#todostate2", el=>el.innerHTML)
		expect(val).to.eql("已完成");
    })
	
	it('测试添加新的待办对旧的有无影响', async function() {        
		await page.click('#btn_add', {delay: 500});
		await page.click('#btn_add', {delay: 500});
		let val = await page.$eval("#todostate2", el=>el.innerHTML)
		expect(val).to.eql("已完成");
    })
	
	it('测试删除功能是否正常', async function() {        
		await page.click('#btn_del2', {delay: 500});
		 
		const listcontent = await page.waitFor('#listcontent');
		let arr = await listcontent.$$("div")
		expect(arr.length).to.eql(4);
    })
	
    /* it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    })  */

  });