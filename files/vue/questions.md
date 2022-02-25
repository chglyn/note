    // elementUI dialog or drawer
```
    const isOpenDrawer = computed({
      get: () => {
        return props.isOpen
      },
      set: (value: boolean) => {
        context.emit('update:isOpen', value)
      }
    })

```
