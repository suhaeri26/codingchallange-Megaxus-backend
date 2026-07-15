import { EmailVerification } from "../models/email-verification.model.js";
import { CoinTransaction, GachaEventItem, GachaEvent, Item, User, GachaLog } from "../models/index.js";
export function setupAssociations(): void {
  /*
   |--------------------------------------------------------------------------
   | User
   |--------------------------------------------------------------------------
   */

  User.hasMany(GachaEvent, {
    foreignKey: "createdBy",
    as: "createdEvents",
  });

  User.hasMany(GachaLog, {
    foreignKey: "userId",
    as: "gachaLogs",
  });

  User.hasMany(CoinTransaction, {
    foreignKey: "userId",
    as: "coinTransactions",
  });

  /*
   |--------------------------------------------------------------------------
   | Gacha Event
   |--------------------------------------------------------------------------
   */

  GachaEvent.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  GachaEvent.hasMany(GachaEventItem, {
    foreignKey: "eventId",
    as: "eventItems",
  });

  GachaEvent.hasMany(GachaLog, {
    foreignKey: "eventId",
    as: "gachaLogs",
  });

  /*
   |--------------------------------------------------------------------------
   | Item
   |--------------------------------------------------------------------------
   */

  Item.hasMany(GachaEventItem, {
    foreignKey: "itemId",
    as: "eventItems",
  });

  /*
   |--------------------------------------------------------------------------
   | Gacha Event Item
   |--------------------------------------------------------------------------
   */

  GachaEventItem.belongsTo(GachaEvent, {
    foreignKey: "eventId",
    as: "event",
  });

  GachaEventItem.belongsTo(Item, {
    foreignKey: "itemId",
    as: "item",
  });

  GachaEventItem.hasMany(GachaLog, {
    foreignKey: "eventItemId",
    as: "gachaLogs",
  });

  /*
   |--------------------------------------------------------------------------
   | Gacha Log
   |--------------------------------------------------------------------------
   */

  GachaLog.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  GachaLog.belongsTo(GachaEvent, {
    foreignKey: "eventId",
    as: "event",
  });

  GachaLog.belongsTo(GachaEventItem, {
    foreignKey: "eventItemId",
    as: "eventItem",
  });

  GachaLog.hasOne(CoinTransaction, {
    foreignKey: "gachaLogId",
    as: "coinTransaction",
  });

  /*
   |--------------------------------------------------------------------------
   | Coin Transaction
   |--------------------------------------------------------------------------
   */
  
  CoinTransaction.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
  
  CoinTransaction.belongsTo(GachaLog, {
    foreignKey: "gachaLogId",
    as: "gachaLog",
  });
  /*
   |--------------------------------------------------------------------------
   | Email Verification
   |--------------------------------------------------------------------------
   */
User.hasMany(EmailVerification, {
  foreignKey: "userId",
  as: "emailVerifications",
});
}