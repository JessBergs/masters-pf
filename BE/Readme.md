# Usage

### importJSONToDynDB.js
Call structure: 
`node .\importJSONToDynDB.js <table name> <path to import file> <keys> `

Example:
`node .\importJSONToDynDB.js masters-pf ../FE/data/projectsData.json ['id', 'promo', 'content']`


### serverless.yml -> Create / update API
- serverless deploy
- to remove infrastructure: severless remove