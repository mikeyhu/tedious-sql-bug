# Minimal Program demonstrating a problem in Tedious MSSQL Driver

## Problem

When sending the Number `99999999999999` as a `Decimal(18,4)` to MSSQLServer via Tedious the server receives a Decimal of `99999999999999.0016`.
This Repo is a minimal program that demonstrates this.

## Running the App

```
docker-compose run app
```

This will start up a SQLServer instance and build and run the simple app.

The application will send two parameters to SQLServer:
* `testNumber` - the number `99999999999999` supplied as a `Decimal(18,4)`
* `testNumberAsString` - the Javascript String representation of `99999999999999` supplied as an NVarChar

A SQL query then runs to return 4 values:
* `numberAsDecimal` - the `testNumber` Decimal as a Number
* `numberAsDecimalToString` - the `testNumber` Decimal converted to a Varchar
* `numberAsDecimalAfterPoint` - the calculation `@testNumber - floor(@testNumber)`
* `stringToDecimalToString` - the `testNumberAsString` converted to a Decimal and back to a varchar

The output received when the app is run is:
```
Javascript number                        99999999999999
numberAsDecimal(DECIMALN)                99999999999999
numberAsDecimalToString(BIGVARCHR)       99999999999999.0016
numberAsDecimalAfterPoint(DECIMALN)      0.0016
stringToDecimalToString(BIGVARCHR)       99999999999999.0000
```

An erroneous `0.0016` is added to the `Decimal(18,4)` representation that is supplied to MSSQLServer.
