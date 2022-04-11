CREATE TABLE ref_satuan  (
    ref_satuan_id UNIQUEIDENTIFIER NOT NULL,
    satuan VARCHAR(30) UNIQUE NOT NULL,
    unit  VARCHAR(30) NOT NULL,
    soft_delete NUMERIC(1,0)    DEFAULT 0,
    created_date DATETIME   NOT NULL,
    expired_date DATETIME NULL,
    last_update DATETIME  NULL,
    CONSTRAINT PK_REF_SATUAN PRIMARY KEY (ref_satuan_id)	
)