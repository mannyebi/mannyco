from base.models import Contact


def creat_contant_record(name, phone_number, message):
    """creat a contant record on database
    """
    try:
        contact = Contact.objects.create(name=name, phone_number=phone_number, message=message)
        return {"status":True}
    except Exception as e:
        return {"status":False, "error":e}
