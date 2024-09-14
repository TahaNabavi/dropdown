## نحوه استفاده

![Alt text](https://s8.uupload.ir/files/1_zk3e.png)
```
<SelectableDropdown
        items={[
          {
            value: "پایتون",
            key: "py",
          },
          {
            value: "جاوااسکریپت",
            key: "js",
          },
          {
            value: "تایپ اسکریپت",
            key: "ts",
          },
          {
            value: "پی اچ پی",
            key: "php",
          },
        ]}
        title={<>زبان های برنامه نویسی</>}
        onChange={(e) => {
          console.log(e);
        }}
      />
```

نشان دادن آیتم انتخاب شده

![Alt text](https://s8.uupload.ir/files/2_im3k.png)
```
<SelectableDropdown
  ...props
  showItemSelecte={true}
/>
```

محل قرار گرفتن منو
"top-left" و "top-right" و "top-middle" و "right" وم "left" و "bottom-left" و "bottom-right" و "bottom-middle"
```
<SelectableDropdown
  ...props
  placement="bottom-middle"
/>
```

لغو انتخاب آیتم
![Alt text](https://s8.uupload.ir/files/3_3jbi.png)
```
<SelectableDropdown
  ...props
  cancelSelect={true}
/>
```

همچنین میتوانید value را به انتخاب خود یک (آبجکت یا آرایه) بدید و با استفاده از itemRenderer اون رو نشون بدید
![Alt text](https://s8.uupload.ir/files/4_wdf8.png)
```
<SelectableDropdown
  ...props
  items={[
    {
      value: { name: "پایتون", logo: "..." },
      key: "py",
    },
    {
      value: { name: "جاوااسکریپت", logo: "..." },
      key: "js",
    },
    {
      value: { name: "تایپ اسکریپت", logo: "..." },
      key: "ts",
    },
    {
      value: { name: "پی اچ پی", logo: "..." },
      key: "php",
    },
  ]}
  itemRenderer={(e) => {
    return (
      <div className="flex align-middle justify-center">
        <img
          src={e.logo}
          alt={e.name}
          className="mx-1 rounded-sm w-6 h-6"
        />
        <span>{e.name}</span>
      </div>
    );
  }}
/>
```
 
همچنین میتوانید از سرچ استفاده کنید
itemSearchShow = مقدار نشان دادن آیتم ها
getItemString = یک فانکشن برای برگرداند یک استرینگ برای سرچ
![Alt text](https://s8.uupload.ir/files/5_28pn.png)
```
<SelectableDropdown
  ...props
  itemSearch={true}
  itemSearchShow={2}
  getItemString={(e) => e}
/>
```
