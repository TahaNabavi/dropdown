**Selectable Dropdown Component**
=============================

A customizable dropdown component built with Tailwind CSS.

## Usage

### Basic Example


![Alt text](https://s8.uupload.ir/files/1_zk3e.png)


```jsx
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

### Showing Selected Item


![Alt text](https://s8.uupload.ir/files/2_im3k.png)


To show the selected item, pass `showItemSelected={true}` as a prop.

```jsx
<SelectableDropdown
  ...props
  showItemSelected={true}
/>
```

### Placement Options

You can customize the placement of the dropdown menu using the `placement` prop. Available options are:

* "top-left"
* "top-right"
* "top-middle"
* "right"
* "left"
* "bottom-left"
* "bottom-right"
* "bottom-middle"

```jsx
<SelectableDropdown
  ...props
  placement="bottom-middle"
/>
```

### Cancel Selection


![Alt text](https://s8.uupload.ir/files/3_3jbi.png)


To allow canceling the selection, pass `cancelSelect={true}` as a prop.

```jsx
<SelectableDropdown
  ...props
  cancelSelect={true}
/>
```

### Custom Item Rendering



![Alt text](https://s8.uupload.ir/files/4_wdf8.png)



You can pass a custom `itemRenderer` function to render the items. This function receives the item value as an argument.

```jsx
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

### Search Functionality


![Alt text](https://s8.uupload.ir/files/5_28pn.png)


To enable search functionality, pass `itemSearch={true}` as a prop. You can also customize the number of items to show using `itemSearchShow`.

```jsx
<SelectableDropdown
  ...props
  itemSearch={true}
  itemSearchShow={2}
  getItemString={(e) => e}
/>
```

### Styling

You can customize the styles of the component using the `menuClassName` and `titleClassName` props.

```jsx
<SelectableDropdown
  ...props
  menuClassName=""
  titleClassName=""
/>
```
