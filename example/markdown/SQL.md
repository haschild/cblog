
AFOL  SQL  记录

> 在看 SQL 表关联的时候，有时候会有疑问，对查询的条件，这里做一个简单的记录。



* TC_FOL_CODE 保存 CODE	编码对应的中文名称

```mysql
SELECT * FROM TC_FOL_CODE TC WHERE TC.STATUS = 10011001
```

* 查询通过审核的银行列表

  ```mysql
  SELECT  DISTINCT
  	BI."ID" AS ID,
  	BI.BANK_ABBR AS bankAbbr,
  	BI.BANK_CH_NAME AS bankChName,
  	BI.BANK_EN_NAME AS bankEnName
  FROM
  	TT_FOL_BANK_BANK_TICKET BT
  JOIN TT_FOL_BANK_INFO BI ON BT.BANK_ID = BI. ID
  AND BI.STATUS = 1
  WHERE
  	BT.AUDIT_STATUS = 7

  ```

* 从查询结果可以知道 银行银票审核通过的 AUDIT_STATUS = 7 是审核通过

  其实在前端的 config.js 这个文件里可以直接看到，银行银票状态

```mysql
SELECT
					*
				FROM
					TT_FOL_BANK_BANK_TICKET BT
				LEFT JOIN TT_FOL_BANK_INFO BI ON BT.BANK_ID = BI. ID
				AND BI.STATUS = 1
				LEFT JOIN TC_FOL_CODE TC ON TC.CODE = BT.AUDIT_STATUS
				AND TC.TYPE_NAME = '银票审核状态'
				AND TC.STATUS = 10011001
				



```





