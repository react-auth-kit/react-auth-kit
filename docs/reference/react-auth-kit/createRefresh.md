---
title: createRefresh - React Auth Kit
description: Create the Refresh Token engine for React Auth Kit
---


# createRefresh

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_createRefresh"></div>

## Import

```js
import createRefresh from 'react-auth-kit/createRefresh';
```


## Function Signature

**createRefresh**<`T`\>([`createRefreshParamInterface`](./types.md#createrefreshparaminterface)): [`createRefreshParamInterface`](./types.md#createrefreshparaminterface)<`T`\>

## Type Parameters

| Name | Description               |
|:-----|:--------------------------|
| `T`  | Type of User State Object |

## Parameters

| Name    | Type                                                                          | Required           | Description                                |
|:--------|:------------------------------------------------------------------------------|:-------------------|:-------------------------------------------|
| `param` | [`createRefreshParamInterface`](./types.md#createrefreshparaminterface)<`T`\> | :heavy_check_mark: | Parameters required for the refresh engine |

## Returns

[`createRefreshParamInterface`]()<`T`\>

Same params with an added layer of safety net.

## Example

```js
const refresh = createRefresh({
    interval: 10,
    refreshApiCallback: async (param) => {
        try {
            const response = await axios.post("/refresh", param, {
                headers: {'Authorization': `Bearer ${param.authToken}`}
            })
            console.log("Refreshing")
            return {
                isSuccess: true,
                newAuthToken: response.data.token,
                newAuthTokenExpireIn: 10,
                newRefreshTokenExpiresIn: 60
            }
        }
        catch(error){
            console.error(error)
            return {
                isSuccess: false
            }
        }
    }
})

```

## Remarks

This function doesn't really "do anything" at runtime, it just helps to organize the code base
Use this function to create the refresh token system

---

#### Defined in

[packages/react-auth-kit/src/createRefresh.ts:119](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/createRefresh.ts#L119)

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
